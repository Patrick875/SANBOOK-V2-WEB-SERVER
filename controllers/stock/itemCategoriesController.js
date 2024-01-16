const { ItemCategory, Store } = require("./../../database/models");

exports.getAll = async (req, res) => {
	try {
		const categories = await ItemCategory.findAll({
			include: [{ model: Store }],
		});
		return res.status(200).json({
			status: "success",
			data: categories,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			status: "request failed",
			message: "server error ",
		});
	}
};

exports.create = async (req, res) => {
	const { name, store } = req.body;
	if (!name || !store) {
		return res.status(400).json({
			status: "Request failed",
			message: "name and store are required",
		});
	}
	try {
		const created = await ItemCategory.create({
			name,
			store,
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
