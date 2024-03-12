const { AccountType } = require("../../database/models");
const { asyncWrapper } = require("../../utils/asyncWrapper");

exports.getAll = asyncWrapper(async (req, res) => {
	const methods = await AccountType.findAll();

	return res.status(200).json({
		data: methods,
		status: "success",
	});
});
