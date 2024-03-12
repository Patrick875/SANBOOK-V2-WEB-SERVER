const express = require("express");
const paymentMethodsController = require("./../../controllers/Accounting/paymentMethods");
const router = express.Router();

router.get("/common/paymentmethods", paymentMethodsController.getAll);

module.exports = router;
