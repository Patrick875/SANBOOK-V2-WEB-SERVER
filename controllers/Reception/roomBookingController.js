const { asyncWrapper } = require("../../utils/asyncWrapper");
const createController = require("../controllerFactory");
const { Booking, Guest } = require("./../../database/models");

exports.getAll = asyncWrapper(async (req, res) => {
	const { page = 1, itemsPerPage = 10 } = req.query;
	const totalCount = await Booking.count();
	const query = req.query;

	let filterObject = {};
	let whereConditions = {};

	const bookings = await Booking.find({
		include: [{ model: Guest }],
	});
	res.status(200).json({
		data: bookings,
		status: "success",
	});
});

exports.create = asyncWrapper(async (req, res) => {
	let { guestId } = req.body.guestDetails;
	const { guestDetails, bookingDetails } = req.body;

	if (!guestId) {
		const newGuest = await Guest.create({ ...guestDetails });
		guestId = newGuest.id;
	}
	const booking = await Booking.create({ ...bookingDetails, guest: guestId });

	return res.status(201).json({
		status: "Room Booking created",
		data: booking,
		message: "room reservation created succesfully !!!!",
	});
});

exports.deleteOne = asyncWrapper(createController(Booking).deleteOne);
exports.deleteAll = asyncWrapper(createController(Booking).deleteAll);
