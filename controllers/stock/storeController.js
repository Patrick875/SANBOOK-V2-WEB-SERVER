const { Store, Item, ItemCategory } = require("./../../database/models");

exports.getAll = async (req, res) => {
	try {
		const stores = await Store.findAll();
		return res.status(200).json({
			status: "success",
			data: stores,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			status: "request failed",
			message: "server error ",
		});
	}
};

exports.getOne = async (req, res) => {
	const { id } = req.params;
	if (!id) {
		return res.status(400).json({
			status: "Request failed",
			message: "id is required",
		});
	}
	try {
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
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			status: "Request Failed",
			message: "sever error",
		});
	}
};
exports.create = async (req, res) => {
	const { name } = req.body;
	if (!name) {
		return res.status(400).json({
			status: "Request failed",
			message: "name is required",
		});
	}
	try {
		const { name, selling } = req.body;
		const created = await Store.create({
			name,
			selling: selling === "selling" ? true : "false",
		});
		return res.status(201).json({
			status: "success",
			data: created,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			status: "Request Failed",
			message: "sever error",
		});
	}
};
