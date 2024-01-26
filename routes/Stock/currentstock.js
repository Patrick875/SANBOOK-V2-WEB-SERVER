const currentStockController = require("./../../controllers/stock/currentstockcontroller");
const express = require("express");
const router = express.Router();

router.get("/currentstock", currentStockController.getAll);

module.exports = router;
