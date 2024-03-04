const express = require("express");
const router = express.Router();

const roomTypesController = require("../../controllers/Reception/Rooms/roomTypescontroller");
const roomRatesController = require("../../controllers/Reception/Rooms/roomRateContoller");

router
	.post("/rooms/roomtypes", roomTypesController.create)
	.get("/rooms/roomtypes", roomTypesController.getAll)
	.delete("/rooms/roomtypes", roomTypesController.deleteAll);
router.route("/rooms/roomtypes/:id").delete(roomTypesController.deleteOne);

router
	.route("/rooms/roomtypes/rates/:id")
	.patch(roomRatesController.update)
	.delete(roomRatesController.deleteOne);
router.route("/rooms/roomtypes/rates").delete(roomRatesController.deleteAll);

module.exports = router;
