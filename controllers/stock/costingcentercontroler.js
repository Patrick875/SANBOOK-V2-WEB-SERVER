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
} = require("./../../database/models");

exports.getAll = asyncWrapper(async (req, res) => {
	const costings = await CostingCenter.findAll();
	return res.status(200).json({
		status: "success",
		data: costings,
	});
});

exports.getOne = asyncWrapper(async (req, res) => {
	const { id } = req.params;
	if (!id) {
		return res.status(400).json({
			status: "Request failed",
			message: "id is required",
		});
	}

	const costing = await CostingCenter.findOne({
		where: { id },
		include: [
			{
				model: CostingCenterItem,
				include: [
					{
						model: BaughtItem,
						include: [
							{
								model: Item,
								include: [{ model: Store }, { model: ItemCategory }],
							},
						],
					},
				],
			},
			{ model: Department },
		],
	});
	if (!costing) {
		return res.status(404).json({
			status: "Request failed",
			message: "costing center not found",
		});
	}
	return res.status(200).json({
		status: "success",
		data: costing,
	});
});
exports.create = asyncWrapper(async (req, res) => {
	const { name, department } = req.body;
	if (!name) {
		return res.status(400).json({
			status: "Request failed",
			message: "name is required",
		});
	}
	const created = await CostingCenter.create({
		name,
		department: department === "" ? null : department,
	});
	return res.status(201).json({
		status: "success",
		data: created,
	});
});

exports.update = asyncWrapper(async (req, res) => {
	const { id } = req.params;
	const { name, department } = req.body;
	if (!id) {
		return res.status(400).json({
			status: "Bad request",
			message: "costing center is required for update",
		});
	}
	const costing = await CostingCenter.findOne({ where: { id } });
	if (!costing) {
		return res.status(404).json({
			status: "not found",
			message: "costing center not found",
		});
	}
	await CostingCenter.update({ name, department }, { where: { id } });
	const updatedCost = await CostingCenter.findOne({ where: { id } });

	return res.status(203).json({
		status: "Item updated",
		data: updatedCost,
		message: "Center updated",
	});
});

exports.deleteOne = asyncWrapper(async (req, res) => {
	const { id } = req.params;
	if (!id) {
		return res.status(400).json({
			status: "Bad request",
			message: "costing center is required for update",
		});
	}
	await CostingCenter.destroy({ where: { id: Number(id) } });
	const deletedRowCount = await CostingCenter.destroy({ where: { id } });
	if (deletedRowCount === 0) {
		res.status(404).json({ error: "Not Found" });
	} else {
		res.status(204).end();
	}
});
exports.deleteAll = asyncWrapper(createController(CostingCenter).deleteAll);
