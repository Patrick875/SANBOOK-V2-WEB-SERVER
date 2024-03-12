const { RoomRate } = require("../../../database/models");
const { asyncWrapper } = require("../../../utils/asyncWrapper");
const createController = require("../../controllerFactory");

exports.getAll = asyncWrapper(async (req, res) => {
	const rates = await RoomRate.findAll;
});
exports.update = asyncWrapper(async (req, res) => {
	const { id } = req.params;

	const { name, value } = req.body;

	const rate = await RoomRate.findOne({ where: { id } });

	if (!rate) {
		return res.status(404).json({
			status: "request failed",
			message: "room rate not found",
		});
	}

	await RoomRate.update({ name, value }, { where: { id } });
	const roomrate = await RoomRate.findOne({ where: { id } });

	return res.status(203).json({
		message: "room-rate updated",
		data: roomrate,
	});
});

exports.deleteOne = asyncWrapper(createController(RoomRate).deleteOne);
exports.deleteAll = asyncWrapper(createController(RoomRate).deleteAll);
