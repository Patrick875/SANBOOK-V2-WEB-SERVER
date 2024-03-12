const express = require("express");
const serviceCategoryController = require("./../../controllers/HotelServices/serviceCtageoriesController");
const router = express.Router();

router
	.route("/")
	.get(serviceCategoryController.getAll)
	.post(serviceCategoryController.create)
	.delete(serviceCategoryController.deleteAll);

router.route("/:id").delete(serviceCategoryController.deleteOne);

module.exports = router;
