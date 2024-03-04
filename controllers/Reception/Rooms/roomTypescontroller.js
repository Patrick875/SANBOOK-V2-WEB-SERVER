const { Room, RoomType, RoomRate } = require("../../../database/models");
const { asyncWrapper } = require("../../../utils/asyncWrapper");
const { generateId } = require("../../../utils/functions");
const createController = require("../../controllerFactory");

const allwaysIncluded = [{ model: Room }];

exports.getAll = asyncWrapper(async (req, res) => {
	const roomTypes = await RoomType.findAll({
		include: [...allwaysIncluded, { model: RoomRate }],
	});

	return res.status(200).json({
		status: "success",
		data: roomTypes,
	});
});

exports.getOne = asyncWrapper(async (req, res) => {
	const { id } = req.params;
	const roomType = await RoomType.findOne({
		where: { id },
		include: [...allwaysIncluded],
	});

	return res.status(200).json({
		data: roomType,
		status: "success",
	});
});

exports.create = asyncWrapper(async (req, res) => {
	const {
		name,
		icon,
		numberofchildren,
		numberofadults,
		smockingallowed,
		bedtype,
		rates,
	} = req.body;
	const code = await generateId("RCLAS", RoomType);
	const roomType = await RoomType.create({
		name,
		code,
		icon,
		numberofchildren,
		numberofadults,
		smockingallowed,
		bedtype,
	});

	if (roomType && rates && rates.length !== 0) {
		for (const rate of rates) {
			console.log("type--", roomType);
			await RoomRate.create({
				roomType: roomType.id,
				name: rate.name,
				value: rate.value,
			});
		}
	}

	const type = await RoomType.findAll({
		where: { id: roomType.id },
		include: [...allwaysIncluded, { model: RoomRate }],
	});

	return res.status(201).json({
		status: "success",
		data: type,
	});
});

exports.deleteOne = asyncWrapper(createController(RoomType).deleteOne);
exports.deleteAll = asyncWrapper(createController(RoomType).deleteAll);
