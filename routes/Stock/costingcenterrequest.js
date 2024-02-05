const express = require("express");
const costingCenterRequestController = require("./../../controllers/stock/costigcenterrequestcontroller");

const router = express.Router();

router.post(
	"/costingcenterrequests/approve",
	costingCenterRequestController.approveRequest
);
router.post(
	"/costingcenterrequests/cancel",
	costingCenterRequestController.cancelRequest
);

router
	.route("/costingcenterrequests")
	.get(costingCenterRequestController.getAll)
	.post(costingCenterRequestController.create);

router
	.route("/costingcenterrequests/:id")
	.get(costingCenterRequestController.getOne);

module.exports = router;
