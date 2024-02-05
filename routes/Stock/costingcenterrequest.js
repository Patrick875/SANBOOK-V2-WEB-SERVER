const express = require("express");
const costingCenterRequestController = require("./../../controllers/stock/costigcenterrequestcontroller");

const router = express.Router();

router
	.route("/costingcenterrequests")
	.get(costingCenterRequestController.getAll)
	.post(costingCenterRequestController.create);

router
	.route("/costingcenterrequests/:id")
	.get(costingCenterRequestController.getOne);

module.exports = router;
