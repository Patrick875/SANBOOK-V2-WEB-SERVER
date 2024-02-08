const { asyncWrapper } = require("../../utils/asyncWrapper.js");
const {
	StockPurchaseOrder,
	Item,
	Supplier,
	SupplierList,
	SupplierListItem,
	BaughtItem,
	ReceiveVoucher,
	StockPurchaseOrderDetail,
	ReceiveVoucherDetail,
	ItemTransaction,
} = require("../../database/models");

exports.getAll = asyncWrapper(async (req, res) => {
	const { item, status, page = 1, itemsPerPage = 10 } = req.query;

	let whereConditions = {};
	let filterOptions = {};
	const limit = parseInt(itemsPerPage, 10);
	const offset = (parseInt(page, 10) - 1) * limit;

	if (item) {
		whereConditions["item"] = item;
	}
	if (status) {
		whereConditions["status"] = status;
	}

	if (Object.keys(whereConditions).length !== 0) {
		filterOptions = { where: whereConditions };
	}
	const all = await ItemTransaction.findAll({
		include: [{ model: Item }],
		order: [["date", "DESC"]],
		...filterOptions,
		limit,
		offset,
	});

	return res.status(200).json({
		status: "success",
		data: all,
	});
});
