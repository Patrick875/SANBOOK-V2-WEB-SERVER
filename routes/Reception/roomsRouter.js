const express = require("express");
const roomsController = require("../../controllers/Reception/Rooms/roomController");

const router = express.Router();

router
	.route("/rooms/")
	.post(roomsController.create)
	.get(roomsController.getAll)
	.delete(roomsController.deleteAll);
router.route("/rooms/roomstatus").get(roomsController.getRoomsByStatus);
router
	.route("/rooms/one")
	.get(roomsController.getOne)
	.delete(roomsController.create);

module.exports = router;
