const { ServiceCategory } = require("../../database/models");
const { asyncWrapper } = require("../../utils/asyncWrapper");
const createController = require("../controllerFactory");

exports.getAll = asyncWrapper(async (req, res) => {
	const serviceCategories = await ServiceCategory.findAll();

	return res.status(200).json({
		status: "success",
		data: serviceCategories,
	});
});

exports.create = asyncWrapper(async (req, res) => {
	const { name } = req.body;
	if (!name) {
		return res.status(400).json({
			status: "bad request",
			message: "service category name is required",
		});
	}
	await ServiceCategory.create({ name });

	return res.status(201).json({
		status: "success",
	});
});

// exports.update= asyncWrapper(async(req,res)=>{})

exports.deleteOne = asyncWrapper(createController(ServiceCategory).deleteOne);
exports.deleteAll = asyncWrapper(createController(ServiceCategory).deleteAll);
