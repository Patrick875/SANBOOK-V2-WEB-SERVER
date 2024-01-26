const {
	ItemPrice,
	Item,
	BaughtItem,
	StockPurchaseOrder,
	StockPurchaseOrderDetail,
} = require("../../database/models");
const { asyncWrapper } = require("../../utils/asyncWrapper");
const { generateId } = require("../../utils/functions");
const createController = require("./../controllerFactory");
const { Op } = require("sequelize");

exports.getAll = asyncWrapper(async (req, res) => {
	const data = await StockPurchaseOrder.findAll({
		include: [
			{
				model: StockPurchaseOrderDetail,
				attributes: {
					exclude: [
						"createdAt",
						"updatedAt",
						"stockPurchaseOrderId",
						"stockItemId",
					],
				},
				include: [
					{
						model: Item,
						attributes: { exclude: ["createdAt", "updatedAt"] },
					},
				],
			},
		],
		attributes: { exclude: ["createdAt", "updatedAt"] },
	});
	return res
		.status(200)
		.json({ status: "success", message: "Purchase order  retrieved", data });
});

exports.getOne = asyncWrapper(async (req, res) => {
	const { id } = req.params;
	if (!id) {
		return res.status(400).json({
			status: "Bad request",
			message: "purchase order id is required !!!!",
		});
	}
	const data = await StockPurchaseOrder.findOne({
		where: { id },
		include: [
			{
				model: StockPurchaseOrderDetail,
				attributes: {
					exclude: [
						"createdAt",
						"updatedAt",
						"stockPurchaseOrderId",
						"stockItemId",
					],
				},
				include: [
					{
						model: Item,
						attributes: { exclude: ["createdAt", "updatedAt"] },
					},
				],
			},
		],
		attributes: { exclude: ["createdAt", "updatedAt"] },
	});
	return res
		.status(200)
		.json({ status: "success", message: "Purchase order  retrieved", data });
});

exports.getOneForReceiver = asyncWrapper(async (req, res) => {
	const { id } = req.params;
	if (!id) {
		return res.status(400).json({
			status: "Bad request",
			message: "purchase order id is required !!!!",
		});
	}
	const data = await StockPurchaseOrder.findAll({
		where: { purchaseOrderId: { [Op.substring]: `${id}` } },
		include: [
			{
				model: StockPurchaseOrderDetail,
				attributes: {
					exclude: [
						"createdAt",
						"updatedAt",
						"stockPurchaseOrderId",
						"stockItemId",
					],
				},
				include: [
					{
						model: Item,
						attributes: { exclude: ["createdAt", "updatedAt"] },
					},
				],
			},
		],
		attributes: { exclude: ["createdAt", "updatedAt"] },
	});
	return res
		.status(200)
		.json({ status: "success", message: "Purchase order  retrieved", data });
});

exports.create = asyncWrapper(async (req, res) => {
	if (!req.body.order || typeof req.body.order !== "object") {
		return res.status(400).json({
			status: "error",
			message: "Order Required and should be an Object",
		});
	}

	let total = req.body.order.reduce((acc, curr) => {
		return acc + curr.price * curr.quantity;
	}, 0);
	const POID = await generateId("PO", StockPurchaseOrder);
	const pOrder = await StockPurchaseOrder.create({
		date: new Date(),
		status: "PENDING",
		purchaseOrderId: POID,
		total,
	});

	if (pOrder) {
		for (let element of req.body.order) {
			let itemValue = await ItemPrice.findOne({
				where: { value: element.price, item: element.id },
			});

			await StockPurchaseOrderDetail.create({
				ItemId: element.id,
				stockPurchaseOrderId: pOrder.id,
				currentQuantity: itemValue ? itemValue.quantity : 0,
				requestQuantity: element.quantity,
				unitPrice: element.price,
				unit: element.unit,
			});
		}
	}

	return res
		.status(201)
		.json({ status: "ok", message: "Successifully Purchase Order added " });
});

exports.update = asyncWrapper(async (req, res) => {
	const { id } = req.params;
	const { order, total } = req.body;
	if (!id) {
		return res.status(400).json({
			status: "bad request",
			message: "purchase Order Id is required",
		});
	}
	const purchaseOrder = await StockPurchaseOrder.findOne({ where: { id } });
	if (!purchaseOrder) {
		return res.status(404).json({
			status: "item not found",
			message: "purchase order not found",
		});
	}
	await StockPurchaseOrder.update(
		{ total },
		{ where: { id: purchaseOrder.id } }
	);
	if (order) {
		await StockPurchaseOrderDetail.destroy({
			where: { stockPurchaseOrderId: id },
		});
		for (let element of req.body.order) {
			let itemValue = await BaughtItem.findOne({
				where: { price: element.unitPrice, item: element.ItemId },
			});

			console.log("this is item", itemValue);

			await StockPurchaseOrderDetail.create({
				ItemId: element.ItemId,
				stockPurchaseOrderId: purchaseOrder.id,
				currentQuantity:
					itemValue && !isNaN(itemValue.quantity)
						? Number.parseInt(itemValue.quantity)
						: 0,
				//currentQuantity: 0,
				requestQuantity: Number(element.requestQuantity),
				unitPrice: element.unitPrice,
				// mainunit: element.mainunit,
			});
		}
	}
	const data = await StockPurchaseOrder.findOne({
		where: { id },
		include: [
			{
				model: StockPurchaseOrderDetail,
				attributes: {
					exclude: [
						"createdAt",
						"updatedAt",
						"stockPurchaseOrderId",
						"stockItemId",
					],
				},
				include: [
					{
						model: Item,
						attributes: { exclude: ["createdAt", "updatedAt"] },
					},
				],
			},
		],
		attributes: { exclude: ["createdAt", "updatedAt"] },
	});

	return res.status(203).json({
		status: "success",
		data,
		message: "Order updated successfuly",
	});
});

exports.deleteAll = asyncWrapper(
	createController(StockPurchaseOrder).deleteAll
);
