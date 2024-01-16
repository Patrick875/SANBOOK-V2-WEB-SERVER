const { Op } = require("sequelize");
const {
	Item,
	Store,
	ItemCategory,
	StockUnit,
	sequelize,
} = require("./../../database/models");

exports.getAll = async (req, res) => {
	console.log("query", req.query);
	const query = req.query;
	try {
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
			// Check if 'item' is present in the query and not an empty string
			if (req.query.item !== undefined && req.query.item !== "") {
				whereConditions.name = { [Op.iLike]: `%${req.query.item}%` };
			}
			// 			where: {
			//     title: { [Op.iLike]: '%The Fox & The Hound%' },
			//   },
			// Check if 'store' is present in the query and not an empty string
			if (req.query.store !== undefined && req.query.store !== "") {
				whereConditions.store = { [Op.eq]: req.query.store };
			}
			// Check if 'category' is present in the query and not an empty string
			if (req.query.category !== undefined && req.query.category !== "") {
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
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			status: "request failed",
			message: "server error",
		});
	}
};

exports.create = async (req, res) => {
	const { name, store, category, mainunit, price } = req.body;
	if (!name || !store || !category || !mainunit) {
		return res.status(400).json({
			status: "Request failed",
			message: "name , store, category, mainunit and price are required",
		});
	}
	try {
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
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			status: "Request Failed",
			message: "sever error",
		});
	}
};
