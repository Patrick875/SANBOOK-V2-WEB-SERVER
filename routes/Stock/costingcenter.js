const express = require("express");
const costingCenterController = require("./../../controllers/stock/costingcentercontroler");

const router = express.Router();

router
	.route("/costingcenters")
	.get(costingCenterController.getAll)
	.post(costingCenterController.create)
	.delete(costingCenterController.deleteAll);

router
	.route("/costingcenters/:id")
	.get(costingCenterController.getOne)
	.patch(costingCenterController.update)
	.delete(costingCenterController.deleteOne);

module.exports = router;
