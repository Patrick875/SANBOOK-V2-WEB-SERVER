const { Op } = require("sequelize");
const {
	Room,
	RoomType,
	RoomRate,
	Sequelize,
} = require("../../../database/models");
const { asyncWrapper } = require("../../../utils/asyncWrapper");
const createController = require("../../controllerFactory");

const allwaysIncludes = [{ model: RoomType, include: [{ model: RoomRate }] }];

exports.getAll = asyncWrapper(async (req, res) => {
	let filterOptions = {};
	let whereConditions = {};
	const { receptionStatus, houseKeepingStatus, type, name, location } =
		req.query;

	if (receptionStatus && receptionStatus !== "") {
		whereConditions = {
			receptionStatus: receptionStatus.toLowerCase(),
		};
	}
	if (houseKeepingStatus && houseKeepingStatus !== "") {
		whereConditions = {
			...whereConditions,
			houseKeepingStatus: houseKeepingStatus.toLowerCase(),
		};
	}
	if (type && type !== "") {
		whereConditions = {
			...whereConditions,
			type: { [Op.eq]: type },
		};
	}
	if (name && name !== "") {
		whereConditions = {
			...whereConditions,
			name: { [Op.substring]: name },
		};
	}
	if (location && location !== "") {
		whereConditions = {
			...whereConditions,
			location: { [Op.substring]: location },
		};
	}
	if (Object.keys(whereConditions).length !== 0) {
		filterOptions = { where: { ...whereConditions } };
	}

	const rooms = await Room.findAll({
		include: [...allwaysIncludes],
		...filterOptions,
	});

	const groups = await Room.findAll({
		attributes: [
			"receptionStatus",
			[Sequelize.fn("COUNT", Sequelize.col("*")), "count"],
		],

		group: ["receptionStatus"], // Include RoomType.id in the GROUP BY clause
	});

	return res.status(200).json({
		status: "success",
		data: rooms,
		groups: groups,
	});
});

exports.getRoomsByStatus = asyncWrapper(async (req, res) => {
	const groups = await Room.findAll({
		attributes: [
			"receptionStatus",
			[Sequelize.fn("COUNT", Sequelize.col("*")), "count"],
		],
		group: ["receptionStatus"],
	});

	return res.status(200).json({
		status: "success",
		data: groups,
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
