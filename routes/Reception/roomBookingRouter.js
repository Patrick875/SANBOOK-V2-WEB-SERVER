const express = require("express");
const router = express.Router();

const roomBookingController = require("./../../controllers/Reception/roomBookingController");

router
	.route("/roomreservation")
	.get(roomBookingController.getAll)
	.post(roomBookingController.create)
	.delete(roomBookingController.deleteAll);

router.get("/rooms/booked", roomBookingController.roomBookedDates);

router.route("/roomreservation/:id").delete(roomBookingController.deleteOne);

module.exports = router;
