const { Op } = require("sequelize");
const { asyncWrapper } = require("../../utils/asyncWrapper");
const {
	Supplier,
	Item,
	SupplierList,
	SupplierListItem,
} = require("./../../database/models");
const createController = require("../controllerFactory");

exports.getOne = asyncWrapper(async (req, res) => {
	const { id } = req.params;
	console.log("this is id", id);
	if (!id) {
		return res.status(400).json({
			status: "Request failed",
			message: "id is required",
		});
	}

	const list = await SupplierList.findOne({
		where: { id },
		include: [
			{
				model: SupplierListItem,
				include: [{ model: Item }],
			},
			{ model: Supplier },
		],
	});
	if (!list) {
		return res.status(404).json({
			status: "Request failed",
			message: "store not found",
		});
	}
	return res.status(200).json({
		status: "success",
		data: list,
	});
});

exports.search = asyncWrapper(async (req, res) => {
	const { id } = req.params;
	const lists = await SupplierList.findAll({
		where: { supplierListId: { [Op.substring]: `${id}` } },
		include: [
			{
				model: SupplierListItem,
				include: [{ model: Item }],
			},
			{ model: Supplier },
		],
	});

	res.status(200).json({
		status: "success",
		data: lists,
	});
});

exports.deleteAll = asyncWrapper(createController(SupplierList).deleteAll);
