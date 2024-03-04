const { Room, RoomType, RoomRate } = require("../../../database/models");
const { asyncWrapper } = require("../../../utils/asyncWrapper");
const createController = require("../../controllerFactory");

const allwaysIncludes = [{ model: RoomType }];

exports.getAll = asyncWrapper(async (req, res) => {
	const rooms = await Room.find({
		include: [...allwaysIncludes],
	});
	const length = await Room.Count();
	return res.status(200).json({
		status: "success",
		data: rooms,
		length,
	});
});

exports.getOne = asyncWrapper(async (req, res) => {
	const { id } = req.params;
	const room = await Room.findOne({
		where: { id: Number(id) },
	});

	return res.status(200).json({
		status: "success",
		data: room,
	});
});

exports.create = asyncWrapper(async (req, res) => {
	const { name, location, type } = req.body;

	const room = await Room.create({
		name,
		location,
		type,
	});

	return res.status(201).json({
		status: "room created",
		data: room,
	});
});

exports.deleleOne = asyncWrapper(createController(Room).deleteOne);
exports.deleteAll = asyncWrapper(createController(Room).deleteAll);
