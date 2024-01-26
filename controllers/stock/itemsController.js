const { Op } = require("sequelize");
const {
	Item,
	Store,
	ItemCategory,
	StockUnit,
	sequelize,
} = require("./../../database/models");
const { asyncWrapper } = require("../../utils/asyncWrapper");

exports.getAll = asyncWrapper(async (req, res) => {
	const query = req.query;

	if (Object.keys(query).length === 0) {
		const groupedItems = await ItemCategory.findAll({
			include: [
				{ model: Store },
				{ model: Item, include: [{ model: StockUnit }] },
			],
		});

		const unGroupedItems = await Item.findAll({
			include: [
				{ model: Store },
				{ model: ItemCategory },
				{ model: StockUnit },
			],
		});

		return res.status(200).json({
			status: "success",
			data: {
				grouped: groupedItems,
				ungrouped: unGroupedItems,
			},
		});
	} else {
		const whereConditions = {};

		// Check if 'store' is present in the query and not an empty string
		if (req.query.store !== undefined && req.query.store !== "") {
			whereConditions.store = { [Op.eq]: req.query.store };
		}
		// Check if 'category' is present in the query and not an empty string
		if (
			req.query.category !== undefined &&
			req.query.category !== "" &&
			req.query.category != 0
		) {
			whereConditions.category = { [Op.eq]: req.query.category };
		}
		// Use findAll with the where conditions
		const products = await Item.findAll({ where: whereConditions });

		// Send the products as a response
		res.status(200).json({
			status: "success",
			data: products,
		});
	}
});

exports.search = asyncWrapper(async (req, res) => {
	const { name } = req.params;
	const items = await Item.findAll({
		where: { name: { [Op.iLike]: `${name}%` } },
	});
	res.status(200).json({
		status: "success",
		data: items,
	});
});

exports.create = asyncWrapper(async (req, res) => {
	const { name, store, category, mainunit, price } = req.body;
	if (!name || !store || !category || !mainunit) {
		return res.status(400).json({
			status: "Request failed",
			message: "name , store, category, and mainunit are required",
		});
	}

	const created = await Item.create({
		name,
		store,
		category,
		mainunit,
		price,
	});
	return res.status(201).json({
		status: "success",
		data: created,
	});
});
