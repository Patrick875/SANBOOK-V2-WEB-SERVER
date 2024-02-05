const { Op } = require("sequelize");
const { asyncWrapper } = require("../../utils/asyncWrapper");
const {
	Supplier,
	Item,
	SupplierList,
	SupplierListItem,
	SupplierItem,
	SupplierItemsList,
} = require("./../../database/models");

const includeArray = [
	{
		model: SupplierList,
	},
];

exports.getAll = asyncWrapper(async (req, res) => {
	const suppliers = await Supplier.findAll({
		include: [{ model: SupplierItemsList, include: [{ model: SupplierItem }] }],
	});
	return res.status(200).json({
		status: "success",
		data: suppliers,
	});
});

exports.getOne = asyncWrapper(async (req, res) => {
	const { id } = req.params;
	console.log("this is id", id);
	if (!id) {
		return res.status(400).json({
			status: "Request failed",
			message: "id is required",
		});
	}

	const supplier = await Supplier.findOne({
		where: { id },
		include: [
			...includeArray,
			{
				model: SupplierItemsList,
				include: [{ model: SupplierItem, include: [{ model: Item }] }],
			},
		],
	});
	if (!supplier) {
		return res.status(404).json({
			status: "Request failed",
			message: "store not found",
		});
	}
	return res.status(200).json({
		status: "success",
		data: supplier,
	});
});

exports.search = asyncWrapper(async (req, res) => {
	const { name } = req.params;
	const suppliers = await Supplier.findAll({
		where: { name: { [Op.substring]: `${name}` } },
		include: [
			...includeArray,
			{
				model: SupplierItemsList,
				include: [{ model: SupplierItem, include: [{ model: Item }] }],
			},
		],
	});

	res.status(200).json({
		status: "success",
		data: suppliers,
	});
});

exports.create = asyncWrapper(async (req, res) => {
	const { name, tel, items } = req.body;
	if (!name) {
		return res.status(400).json({
			status: "Request failed",
			message: "name is required",
		});
	}

	const created = await Supplier.create({
		name,
		tel,
	});
	if (items && items.length !== 0) {
		const list = await SupplierItemsList.create({
			supplier: created.id,
		});
		for (item of items) {
			await SupplierItem.create({
				list: list.id,
				item,
			});
		}
	}
	return res.status(201).json({
		status: "success",
		data: created,
	});
});
