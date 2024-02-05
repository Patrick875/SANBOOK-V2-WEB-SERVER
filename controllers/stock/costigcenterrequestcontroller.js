const { asyncWrapper } = require("../../utils/asyncWrapper");
const createController = require("../controllerFactory");
const {
	CostingCenter,
	CostingCenterItem,
	BaughtItem,
	Item,
	ItemCategory,
	Store,
	Department,
	CostingCenterRequest,
	CostingCenterRequestItem,
} = require("./../../database/models");

exports.getAll = asyncWrapper(async (req, res) => {
	const requests = await CostingCenterRequest.findAll({
		include: [{ model: CostingCenter }],
	});
	return res.status(200).json({
		status: "success",
		data: requests,
	});
});
exports.getOne = asyncWrapper(async (req, res) => {
	const { id } = req.params;
	if (!id) {
		return res.status(400).json({
			status: "Bad request",
			message: "Request id is required for request",
		});
	}
	const request = await CostingCenterRequest.findOne({
		where: { id },
		include: [
			{
				model: CostingCenterRequestItem,
				include: [{ model: BaughtItem, include: [{ model: Item }] }],
			},
		],
	});
	return res.status(200).json({
		status: "success",
		data: request,
	});
});
exports.create = asyncWrapper(async (req, res) => {
	// to create a stock transaction
	// receive an array of baught items with quantities

	const { center, items } = req.body;
	if (!center) {
		return res.status(400).json({
			status: "Bad request",
			message: "costing center id is required",
		});
	}
	const request = await CostingCenterRequest.create({
		costingcenter: center,
		date: req.body.date || new Date().toUTCString(),
	});

	for (const item of items) {
		await CostingCenterRequestItem.create({
			request: request.id,
			item: item.id,
			quantity: item.quantity,
			unit: item.unit,
			price: item.price || item.unitPrice,
		});
	}

	const createdRequest = await CostingCenterRequest.findOne({
		where: { id: request.id },
		include: [
			{
				model: CostingCenterRequestItem,
				include: [{ model: BaughtItem, include: [{ model: Item }] }],
			},
		],
	});
	return res.status(201).json({
		status: "success",
		message: "Request created successfully",
		data: createdRequest,
	});
});

exports.UpdateStatus = asyncWrapper(async (req, res) => {
	// update those items removing the quantity requested
	// create stock request items or update them using the center as stock id
	// record stock transaction
});
exports.deleteAll = asyncWrapper(
	createController(CostingCenterRequest).deleteAll
);
