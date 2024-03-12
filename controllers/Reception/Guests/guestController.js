const { asyncWrapper } = require("../../../utils/asyncWrapper");
const { Guest } = require("../../../database/models");
const createController = require("../../controllerFactory");
const { Op } = require("sequelize");

exports.getAll = asyncWrapper(async (req, res) => {
	const { name } = req.query;
	let filterOptions = {};
	let whereConditions = {};

	if (name && name !== "") {
		whereConditions = {
			[Op.or]: [
				{ firstname: { [Op.notILike]: name } },
				{ lastname: { [Op.notILike]: name } },
			],
		};
	}
	if (Object.keys(whereConditions).length !== 0) {
		filterOptions = { where: { ...whereConditions } };
	}
	const guests = await Guest.findAll({
		...filterOptions,
	});

	return res.status(200).json({
		status: "success",
		data: guests,
	});
});

exports.deleleAll = asyncWrapper(createController(Guest).deleleAll);
