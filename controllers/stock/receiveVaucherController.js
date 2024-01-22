const { asyncWrapper } = require("../../utils/asyncWrapper.js");
const {
	StockPurchaseOrder,
	Item,
	BaughtItem,
	ReceiveVoucher,
	StockPurchaseOrderDetail,
	ReceiveVoucherDetail,
	ItemTransaction,
} = require("../../database/models");
const { generateId } = require("../../utils/functions.js");
const createController = require("../controllerFactory.js");

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
	console.log("purchase side", purchase);

	// we get the id of the purchase order from the first object in the data array

	const stockPurchaseOrderId = receive[0].stockPurchaseOrderId;

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

			let itemValue = await BaughtItem.findOne({
				where: { price: element.unitPrice, item: element.ItemId },
			});
			//if the item doesn't exist

			//create an new item  price assigning it the provided quantity and price
			// and the it of the item

			if (!itemValue) {
				itemValue = await BaughtItem.create({
					quantity: Number(element.receiveQuantity),
					price: Number(element.unitPrice),
					item: element.ItemId,
				});
			} else {
				// if the item already exists take its current quantity and increment it by the sumbitted value
				itemValue.set({
					quantity: Number(itemValue.quantity + element.receiveQuantity),
				});
				await itemValue.save();
			}

			//console.log("existing or new bought item", itemValue);

			//2.CREATING A STOCK TRANSACTION FOR TRACKING THE ITEM HISTORY

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

	return res
		.status(201)
		.json({ status: "ok", message: "Successifully Receive Voucher added " });
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