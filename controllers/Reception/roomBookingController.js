const { asyncWrapper } = require("../../utils/asyncWrapper");
const createController = require("../controllerFactory");
const { Booking, Guest, Room } = require("./../../database/models");

exports.getAll = asyncWrapper(async (req, res) => {
	const { page = 1, itemsPerPage = 10 } = req.query;
	const totalCount = await Booking.count();
	const query = req.query;

	let filterObject = {};
	let whereConditions = {};

	const bookings = await Booking.findAll({
		include: [{ model: Guest }, { model: Room }],
	});
	res.status(200).json({
		data: bookings,
		status: "success",
	});
});

//creating a bookikng

// i need a room when room is selected detects the free dates
// detecting the free dates

/// check through all bookings and the dates on them ...
/// return those dates where the room Id has a booking
//  on the frontednd remove those dates

// on reserved mark the booking as reserverd
// on checked in mark the room as checked in

exports.create = asyncWrapper(async (req, res) => {
	let { guestId } = req.body.guestDetails;
	const { guestDetails, bookingDetails } = req.body;

	if (!guestId) {
		const newGuest = await Guest.create({ ...guestDetails });
		guestId = newGuest.id;
	}
	const booking = await Booking.create({ ...bookingDetails, guest: guestId });
	//calculating reservation totals

	return res.status(201).json({
		status: "Room Booking created",
		data: booking,
		message: "room reservation created succesfully !!!!",
	});
});

exports.roomBookedDates = asyncWrapper(async (req, res) => {
	const { room } = req.query;

	const roomBookings = await Booking.findAll({ where: { room } });

	const bookedDates = roomBookings.map((booking) => booking.datesIn);

	return res.status(200).json({
		status: "success",
		data: [...bookedDates],
	});
});

exports.deleteOne = asyncWrapper(createController(Booking).deleteOne);
exports.deleteAll = asyncWrapper(createController(Booking).deleteAll);
