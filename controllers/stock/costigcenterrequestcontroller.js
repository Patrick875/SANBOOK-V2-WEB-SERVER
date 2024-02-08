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
	ItemTransaction,
	CostingCenterRequest,
	CostingCenterRequestItem,
} = require("./../../database/models");

const recordStockTransaction = async (baughtItem, newQuantity) => {
	await ItemTransaction.create({
		item: baughtItem.item,
		preQuantity: baughtItem.quantity,
		newQuantity: newQuantity,
		date: new Date().toUTCString(),
		price: Number(baughtItem.unitPrice),
		balance: newQuantity,
		status: "REMOVED",
		store: baughtItem.Item.store,
		category: baughtItem.Item.category,
	});
};

const includeAll = [
	{ model: CostingCenter },
	{
		model: CostingCenterRequestItem,
		include: [{ model: BaughtItem, include: [{ model: Item }] }],
	},
];

exports.getAll = asyncWrapper(async (req, res) => {
	const { center, status, page = 1, itemsPerPage = 10 } = req.query;

	let whereConditions = {};
	let filterOptions = {};
	const limit = parseInt(itemsPerPage, 10);
	const offset = (parseInt(page, 10) - 1) * limit;

	if (center) {
		whereConditions["costingcenter"] = center;
	}
	if (status) {
		whereConditions["status"] = status;
	}

	if (Object.keys(whereConditions).length !== 0) {
		filterOptions = { where: whereConditions };
	}
	const requests = await CostingCenterRequest.findAll({
		include: [{ model: CostingCenter }],
		...filterOptions,
		limit,
		offset,
		include: includeAll,
	});
	return res.status(200).json({
		status: "success",
		data: requests,
	});
});
exports.getOne = asyncWrapper(async (req, res) => {
	const { id } = req.params;
	if (!id) {
		return res.status(400).json({
			status: "Bad itemsRequest",
			message: "Request id is required for itemsRequest",
		});
	}
	const itemsRequest = await CostingCenterRequest.findOne({
		where: { id },
		include: includeAll,
	});
	return res.status(200).json({
		status: "success",
		data: itemsRequest,
	});
});
exports.create = asyncWrapper(async (req, res) => {
	const { center, items } = req.body;
	if (!center) {
		return res.status(400).json({
			status: "Bad itemsRequest",
			message: "costing center id is required",
		});
	}
	const itemsRequest = await CostingCenterRequest.create({
		costingcenter: center,
		date: req.body.date || new Date().toUTCString(),
	});

	const filteredItems = items.filter((item) => item.quantity !== null);
	for (const item of filteredItems) {
		await CostingCenterRequestItem.create({
			request: itemsRequest.id,
			baughtitem: item.id,
			quantity: item.quantity,
			unit: !item.unit ? item.Item.mainunit : item.unit,
			price: item.price || item.unitPrice,
		});
	}

	const createdRequest = await CostingCenterRequest.findOne({
		where: { id: itemsRequest.id },
		include: [
			{
				model: CostingCenterRequestItem,
				include: [{ model: BaughtItem, include: [{ model: Item }] }],
			},
		],
	});
	return res.status(201).json({
		status: "success",
		message: "Request created successfully",
		data: createdRequest,
	});
});

exports.approveRequest = asyncWrapper(async (req, res) => {
	//get the itemsRequest id,items and costingcenterID
	const { id, items, costingcenter } = req.body;

	//return 400 when either of the above is not provided

	if (!id || !costingcenter) {
		return res.status(404).json({
			status: "Bad Request",
			message: "Request id and costingcenter id are required",
		});
	}

	//verify if the itemsRequest exists and return 404 if the itemsRequest is not found

	const itemsRequest = await CostingCenterRequest.findOne({
		where: { id },
		include: includeAll,
	});

	if (!itemsRequest) {
		return res.status(404).json({
			status: "Bad Request",
			message: "Request with id not found",
		});
	}
	if (
		itemsRequest.status === "APPROVED" ||
		itemsRequest.status === "CANCELED"
	) {
		return res.status(404).json({
			status: "Bad Request",
			message: "Request already updated",
		});
	}
	//get requestitemids on the requetst for verifying if the requested items are the ones that need approval
	const requestedItemsIds = itemsRequest.CostingCenterRequestItems.map(
		(el) => el.baughtitem
	);

	//updating the stock process
	if (items.length !== 0) {
		//for each item of on the itemsRequest
		for (const item of items) {
			//check if the submitted item was initialy on the itemsRequest using requestedItemsIds
			if (requestedItemsIds.includes(item.baughtitem)) {
				//find if the item requested exists in stock
				const product = await BaughtItem.findOne({
					where: { id: item.baughtitem },
					include: [
						{
							model: Item,
							include: [{ model: Store }, { model: ItemCategory }],
						},
					],
				});
				if (product) {
					console.log("here is product", product);
					//check if the item is already in the stock
					//if yes update only the quantity
					//else create a newStock item and give it the requested item
					const inCurrentStock = await CostingCenterItem.findOne({
						where: { costingcenter, baughtitem: product.id },
					});

					if (!inCurrentStock) {
						await CostingCenterItem.create({
							baughtitem: product.id,
							quantity: item.quantity,
							price: item.price,
							unit: item.unit,
							costingcenter,
						});
					} else {
						await CostingCenterItem.update(
							{ quantity: inCurrentStock.quantity + item.quantity },
							{ where: { baughtitem: item.baughtitem, costingcenter } }
						);
					}
					//if the product exists update its quantity removing the requested quantity if its quantity is not zero
					if (product.quantity > item.quantity) {
						await BaughtItem.update(
							{
								quantity: product.quantity - item.quantity,
							},
							{ where: { id: item.baughtitem } }
						);
					} else {
						return res.status(400).json({
							status: "Bad itemsRequest",
							message:
								"item quantity requested more than the available quantity",
						});
					}

					//compute the newQuantity for the stock-transaction logic,

					const newQuantity = product.quantity - item.quantity;
					//record a stock transaction for each item

					// record stock transaction
					await recordStockTransaction(product, newQuantity);
				} else {
					return res.status(404).json({
						status: "Bad itemsRequest",
						message: "Item not found in store",
					});
				}
			} else {
				return res.status(400).json({
					status: "Bad or modified itemsRequest",
					message: `item with name ${item.BaughtItem.Item.name} was not initialy requested`,
				});
			}
		}
		await CostingCenterRequest.update(
			{ status: "APPROVED" },
			{ where: { id: itemsRequest.id } }
		);
		return res.status(203).json({
			status: "success",
			newStatus: "APPROVED",
			message: "items added to costing-center",
		});
	} else {
		return res.status(400).json({
			status: "Bad itemsRequest",
			message: "no items submitted on itemsRequest",
		});
	}
});
exports.cancelRequest = asyncWrapper(async (req, res) => {
	const { id } = req.body;
	const itemsRequest = await CostingCenterRequest.findOne({
		where: { id },
		include: includeAll,
	});

	if (!itemsRequest) {
		return res.status(404).json({
			status: "Bad Request",
			message: "Request with id not found",
		});
	}

	await CostingCenterRequest.update(
		{
			status: "CANCELED",
		},
		{ where: { id } }
	);
	return res.status(203).json({
		status: "success",
		newStatus: "CANCELED",
		message: "request Canceled",
	});
});
exports.deleteAll = asyncWrapper(
	createController(CostingCenterRequest).deleteAll
);
