const { Op } = require("sequelize");
const {
	Item,
	BaughtItem,
	Store,
	ItemCategory,
} = require("../../database/models");
const { asyncWrapper } = require("../../utils/asyncWrapper");

const alwaysExcludedAttributes = ["updatedAt", "createdAt"];

exports.getAll = asyncWrapper(async (req, res) => {
	const { page = 1, itemsPerPage = 10 } = req.query;

	// Fetch total number of items in the database
	const totalCount = await BaughtItem.count();

	let items = [];
	const query = req.query;
	const includeArray = [
		{
			model: Item,
			attributes: {
				exclude: [
					"store",
					"price",
					"category",
					"createdBy",
					...alwaysExcludedAttributes,
				],
			},
			include: [
				{
					model: Store,
					attributes: {
						exclude: ["createdBy", ...alwaysExcludedAttributes],
					},
				},
				{
					model: ItemCategory,
					attributes: {
						exclude: ["createdBy", ...alwaysExcludedAttributes],
					},
				},
			],
		},
	];
	const orderArray = [
		[{ model: Item }, "name", "ASC"], // Sort by Item.name in ascending order
		["price", "ASC"], // Sort by price in ascending order
	];

	let filterOptions = {};
	let whereConditions = {};

	// Check if 'store' is present in the query and not an empty string
	if (query.store !== undefined && query.store !== "") {
		whereConditions["$Item.store$"] = { [Op.eq]: query.store };
	}
	// Check if 'category' is present in the query and not an empty string
	if (
		query.category !== undefined &&
		query.category !== "" &&
		query.category != 0
	) {
		whereConditions["$Item.category$"] = { [Op.eq]: query.category };
	}
	if (query.name == undefined || query.name === "") {
		console.log("query-stuff", query.name);
	} else {
		whereConditions["$Item.name$"] = { [Op.substring]: query.name };
	}

	if (Object.keys(whereConditions).length !== 0) {
		filterOptions = { where: whereConditions };
	}

	const limit = parseInt(itemsPerPage, 10);
	const offset = (parseInt(page, 10) - 1) * limit;

	// Fetch paginated items
	items = await BaughtItem.findAll({
		include: includeArray,
		attributes: {
			exclude: alwaysExcludedAttributes,
		},
		order: orderArray,
		...filterOptions,
		limit,
		offset,
	});

	res.status(200).json({
		status: "success",
		data: items,
		length: totalCount,
	});
});
