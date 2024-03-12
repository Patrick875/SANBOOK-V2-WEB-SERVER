const express = require("express");
const serviceController = require("../../controllers/HotelServices/servicesController");
const router = express.Router();

router
	.route("/")
	.get(serviceController.getAll)
	.post(serviceController.create)
	.delete(serviceController.deleteAll);

router
	.route("/sales")
	.get(serviceController.getAllServiceSales)
	.post(serviceController.sellService);

router.route("/saleswithdebts").get(serviceController.getServiceSalesWithDebts);
router.route("/salesdashdata").get(serviceController.getServicesDashboardData);

router.route("/delete/:id").delete(serviceController.deleteOne);

module.exports = router;
