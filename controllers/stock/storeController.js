const { asyncWrapper } = require("../../utils/asyncWrapper");
const { Store, Item, ItemCategory } = require("./../../database/models");

exports.getAll = asyncWrapper(async (req, res) => {
	const stores = await Store.findAll();
	return res.status(200).json({
		status: "success",
		data: stores,
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

	const store = await Store.findOne({
		where: { id },
		include: [{ model: Item, include: [{ model: ItemCategory }] }],
	});
	if (!store) {
		return res.status(404).json({
			status: "Request failed",
			message: "store not found",
		});
	}
	return res.status(200).json({
		status: "success",
		data: store,
	});
});
exports.create = asyncWrapper(async (req, res) => {
	const { name } = req.body;
	if (!name) {
		return res.status(400).json({
			status: "Request failed",
			message: "name is required",
		});
	}
	const created = await Store.create({
		name,
		selling: selling === "selling" ? true : "false",
	});
	return res.status(201).json({
		status: "success",
		data: created,
	});
});
