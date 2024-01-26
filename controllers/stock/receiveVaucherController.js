const { asyncWrapper } = require("../../utils/asyncWrapper.js");
const {
	StockPurchaseOrder,
	Item,
	Supplier,
	SupplierList,
	SupplierListItem,
	BaughtItem,
	ReceiveVoucher,
	StockPurchaseOrderDetail,
	ReceiveVoucherDetail,
	ItemTransaction,
} = require("../../database/models");
const { generateId } = require("../../utils/functions.js");
const createController = require("../controllerFactory.js");

const adaptElement = (element) => {
	let newElement = { ...element };
	newElement.receiveQuantity = newElement.quantity;
	newElement.unitPrice = newElement.price;
	newElement.ItemId = newElement.id;

	return newElement;
};
const updateBaughtItemTable = async (element, type) => {
	const newElement = adaptElement(element);
	let itemValue = await BaughtItem.findOne({
		where: { price: newElement.unitPrice, item: newElement.ItemId },
	});
	//if the item doesn't exist

	//create an new item  price assigning it the provided quantity and price
	// and the it of the item

	if (!itemValue) {
		itemValue = await BaughtItem.create({
			quantity: Number(newElement.receiveQuantity),
			price: Number(newElement.unitPrice),
			item: newElement.ItemId,
		});
	} else {
		// if the item already exists take its current quantity and increment it by the sumbitted value
		itemValue.set({
			quantity: Number(itemValue.quantity + element.receiveQuantity),
		});
		await itemValue.save();
	}

	return itemValue;
};
const recordStockTransaction = async (itemValue, element) => {
	await ItemTransaction.create({
		item: itemValue.item,
		preQuantity: itemValue ? itemValue.quantity : 0,
		newQuantity: element.receiveQuantity,
		date: new Date().toUTCString(),
		price: Number(element.unitPrice),
		balance:
			Number(itemValue ? itemValue.receiveQuantity : 0) +
			Number(element.receiveQuantity),
		status: "ADDED",
	});
};

exports.create = asyncWrapper(async (req, res) => {
	//receive the data from frontend which must have a data key
	if (!req.body.data) {
		return res.status(400).json({
			status: "error",
			message:
				"the request should be a JSON object and have property named data",
		});
	}
	//data key must be an array of objects with a quantity and price
	// here we calculate the total of the order using the objects in the data array
	let total = req.body.data.receive.reduce((acc, curr) => {
		return acc + Number(curr.unitPrice * curr.receiveQuantity);
	}, 0);

	const { data } = req.body;

	//purchase side
	const { receive } = data;
	const { purchase } = data;

	// we get the id of the purchase order from the first object in the data array

	const stockPurchaseOrderId = receive[0].stockPurchaseOrderId;
	const purchaseOrder = await StockPurchaseOrder.findOne({
		where: { id: stockPurchaseOrderId },
		include: [
			{
				model: StockPurchaseOrderDetail,
				include: [{ model: Item }],
			},
		],
	});
	if (!purchaseOrder) {
		return res.status(404).json({
			status: "error",
			message: "purchase order not found",
		});
	}

	// get the user id from the request
	//const user = req.user;
	//creating a  receive object -- as expected
	const ROCID = await generateId("RV", ReceiveVoucher);

	const reveiveVoucher = await ReceiveVoucher.create({
		date: new Date().toUTCString(),
		stockPurchaseOrderId: stockPurchaseOrderId,
		receiveVoucherId: ROCID,
		total,
	});

	//if the receive vaucher is created

	if (reveiveVoucher) {
		// loop through all the objects sent on the data array
		//PROCESS--1 UPDATING THE STOCK
		//THIS IS DONE FOR EACH ITEM INDEPENDTLY
		for (let element of receive) {
			//check if there exists an item with the same name and price
			const itemValue = updateBaughtItemTable(element);
			//2.CREATING A STOCK TRANSACTION FOR TRACKING THE ITEM HISTORY

			recordStockTransaction(itemValue, element);
			//FINALLY CREATING A RECEIVE VAUCHER DETAIL SO THAT WE CAN SEE
			//THE ELEMENTS OF THE RECEIVE VAUCHER  IN THE FUTURE
			await ReceiveVoucherDetail.create({
				item: element.ItemId,
				receiveVoucherId: reveiveVoucher.id,
				receivedQuantity: Number(element.receiveQuantity),
				unitPrice: Number(element.unitPrice),
			});
		}
	}

	//updating the purchase order in case the data submitted was changed
	//removing existing details and replacing with incoming ones
	await StockPurchaseOrderDetail.destroy({
		where: { stockPurchaseOrderId: stockPurchaseOrderId },
	});

	for (let element of purchase) {
		await StockPurchaseOrderDetail.create({
			ItemId: element.ItemId,
			stockPurchaseOrderId,
			currentQuantity: element.currentQuantity,
			requestQuantity: element.requestQuantity,
			unitPrice: element.unitPrice,
			unit: element.unit,
		});
	}

	const totalPurchase = purchase.reduce((acc, item) => {
		const prod = item.requestQuantity * item.unitPrice;
		return prod + acc;
	}, 0);
	await StockPurchaseOrder.update(
		{ total: totalPurchase },
		{ where: { id: stockPurchaseOrderId } }
	);

	return res.status(201).json({
		status: "ok",
		voucherId: reveiveVoucher.receiveVoucherId,
		message: "Successfully Receive Voucher added ",
	});
});

exports.addFromSupplier = asyncWrapper(async (req, res) => {
	//get  the received data after checking the conditions
	if (!req.body.data) {
		return res.status(400).json({
			status: "error",
			message:
				"the request should be a JSON object and have property named data",
		});
	}
	const { items, supplierId } = req.body.data;
	console.log("request body", req.body);

	if (!items || items.length === 0) {
		return res.status(400).json({
			status: "Bad request",
			message: "items array is required and must be an empty",
		});
	}
	//data key must be an array of objects with a quantity and price
	// here we calculate the total of the order using the objects in the data array
	let total = items.reduce((acc, curr) => {
		return acc + Number(curr.price * curr.quantity);
	}, 0);

	if (!supplierId) {
		return res.status(400).json({
			status: "request failed",
			message: "supplier id is required",
		});
	}
	const supplier = await Supplier.findOne({ where: { id: supplierId } });
	if (!supplier) {
		return res.status(404).json({
			status: "not found",
			message: "supplier not found",
		});
	}
	const ROCID = await generateId("RV", ReceiveVoucher);

	//create a supplier list using supplier key on req.body.supplier
	const supplierList = await SupplierList.create({
		supplier: supplier.id,
		total,
		date: new Date().toUTCString(),
	});
	//create a receive vaucher with the supplierList Id

	const receiveVoucher = await ReceiveVoucher.create({
		date: new Date().toUTCString(),
		supplierList: supplierList.id,
		receiveVoucherId: ROCID,
		total,
	});
	for (element of items) {
		//create supplierList items from the data attaching the supplierListId
		await SupplierListItem.create({
			supplierlist: supplierList.id,
			item: element.id,
			quantity: Number(element.quantity),
			unitPrice: Number(element.price),
		});
		const newElement = adaptElement(element);
		await ReceiveVoucherDetail.create({
			item: newElement.ItemId,
			receiveVoucherId: receiveVoucher.id,
			receivedQuantity: Number(newElement.receiveQuantity),
			unitPrice: Number(newElement.unitPrice),
		});
		//update BaugthItems for prices and quantities
		const itemValue = updateBaughtItemTable(element, "supplier");
		//create stock transactions to record the transactions
		recordStockTransaction(itemValue, element);
	}
	//return receiver vaucher id
	return res.status(201).json({
		status: "ok",
		data: receiveVoucher,
		voucherId: receiveVoucher.receiveVoucherId,
		message: "Successfully Receive Voucher added ",
	});
});

exports.update = asyncWrapper(async (req, res) => {
	const { id } = req.params;
	const { purchase, receive, totalRec, totalPurc, supplierList } =
		req.body.data;

	console.log("request data--data", req.body.data);

	if (!id) {
		return res.status(400).json({
			status: "request failed",
			message: "receive voucher order Id is required",
		});
	}
	const receiveVoucher = await ReceiveVoucher.findOne({ where: { id } });
	if (!receiveVoucher) {
		return res.status(400).json({
			status: "request failed",
			message: "item not found",
		});
	}

	await ReceiveVoucher.update({ total: Number(totalRec) }, { where: { id } });
	if (purchase) {
		await StockPurchaseOrder.update(
			{ total: totalPurc },
			{ where: { id: receiveVoucher.stockPurchaseOrderId } }
		);
		for (element of purchase) {
			await StockPurchaseOrderDetail.update(
				{
					requestQuantity: element.requestQuantity,
					unit: element.unit,
					unitPrice: element.unitPrice,
				},
				{ where: { id: element.purchaseDetailId } }
			);
		}
	} else {
		for (element of receive) {
			await SupplierListItem.update(
				{
					item: element.item,
					quantity: Number(element.receiveQuantity),
					unitPrice: Number(element.unitPrice),
				},
				{ where: { supplierlist: supplierList } }
			);
		}
	}

	for (element of receive) {
		await ReceiveVoucherDetail.update(
			{
				receivedQuantity: element.receivedQuantity,
				unitPrice: element.unitPrice,
			},
			{ where: { id: element.detailId } }
		);
	}

	const data = await ReceiveVoucher.findOne({
		where: { id },
		include: [
			{
				model: StockPurchaseOrder,
				order: [["createdAt", "DESC"]],
				attributes: { exclude: ["createdAt", "updatedAt"] },
				include: [
					{
						model: StockPurchaseOrderDetail,
						attributes: { exclude: ["createdAt", "updatedAt"] },
						include: [
							{
								model: Item,
								attributes: { exclude: ["createdAt", "updatedAt"] },
							},
						],
					},
				],
			},
			{
				model: ReceiveVoucherDetail,
				include: [
					{
						model: Item,
						attributes: { exclude: ["createdAt", "updatedAt"] },
					},
				],
				attributes: {
					exclude: [
						"createdAt",
						"updatedAt",
						"stockPurchaseOrderId",
						"ReceiveVoucherId",
						"stockItemId",
					],
				},
			},
			{
				model: SupplierList,
				include: [{ model: Supplier }, { model: SupplierListItem }],
			},
		],
		attributes: {
			exclude: ["stockPurchaseOrderId", "createdAt", "updatedAt"],
		},
	});

	res.status(203).json({
		status: "Request success",
		data,
	});
});

exports.getAll = asyncWrapper(async (req, res) => {
	const data = await ReceiveVoucher.findAll({
		include: [
			{
				model: StockPurchaseOrder,
				order: [["createdAt", "DESC"]],
				attributes: { exclude: ["createdAt", "updatedAt"] },
				include: [
					{
						model: StockPurchaseOrderDetail,
						order: [["createdAt", "DESC"]],
						attributes: { exclude: ["createdAt", "updatedAt"] },
						include: [
							{
								model: Item,
								order: [["createdAt", "DESC"]],
								attributes: { exclude: ["createdAt", "updatedAt"] },
							},
						],
					},
				],
			},
			{
				model: ReceiveVoucherDetail,
				include: [
					{
						model: Item,
						order: [["id", "DESC"]],
						attributes: { exclude: ["createdAt", "updatedAt"] },
					},
				],
				attributes: {
					exclude: [
						"createdAt",
						"updatedAt",
						"stockPurchaseOrderId",
						"ReceiveVoucherId",
						"stockItemId",
					],
				},
			},
			{
				model: SupplierList,
				include: [{ model: Supplier }, { model: SupplierListItem }],
			},
		],
		attributes: { exclude: ["stockPurchaseOrderId", "createdAt", "updatedAt"] },
	});

	return res.status(200).json({ status: "success", data });
});

exports.getOne = asyncWrapper(async (req, res) => {
	const { id } = req.params;
	const data = await ReceiveVoucher.findOne({
		where: { id },
		include: [
			{
				model: StockPurchaseOrder,
				order: [["createdAt", "DESC"]],
				attributes: { exclude: ["createdAt", "updatedAt"] },
				include: [
					{
						model: StockPurchaseOrderDetail,
						attributes: { exclude: ["createdAt", "updatedAt"] },
						include: [
							{
								model: Item,
								attributes: { exclude: ["createdAt", "updatedAt"] },
							},
						],
					},
				],
			},
			{
				model: ReceiveVoucherDetail,
				include: [
					{
						model: Item,
						attributes: { exclude: ["createdAt", "updatedAt"] },
					},
				],
				attributes: {
					exclude: [
						"createdAt",
						"updatedAt",
						"stockPurchaseOrderId",
						"ReceiveVoucherId",
						"stockItemId",
					],
				},
			},
			{
				model: SupplierList,
				include: [{ model: Supplier }, { model: SupplierListItem }],
			},
		],
		attributes: {
			exclude: ["stockPurchaseOrderId", "createdAt", "updatedAt"],
		},
	});

	return res.status(200).json({ status: "success", data });
});

exports.deleteAll = asyncWrapper(createController(ReceiveVoucher).deleteAll);

exports.trackItemTransaction = asyncWrapper(async (req, res) => {
	const { stockItemId } = req.params;
	if (!stockItemId) {
		return res
			.status(400)
			.json({ status: "error", message: "Stock Item is required" });
	}
	const stockItem = await Item.findByPk(stockItemId);

	if (!stockItem) {
		return res
			.status(404)
			.json({ status: "error", message: "No Stock Item found" });
	}
	const itemTrack = await StockPurchaseOrder.findAll({
		include: [
			{
				model: StockPurchaseOrderDetail,
				where: { stockItemId: stockItem },
				include: [
					{
						model: Item,
						attributes: { exclude: ["createdAt", "updatedAt"] },
					},
				],
				attributes: {
					exclude: ["stockPurchaseOrderId", "createdAt", "updatedAt"],
				},
			},
		],
		order: [["date", "DESC"]],
	});
});
