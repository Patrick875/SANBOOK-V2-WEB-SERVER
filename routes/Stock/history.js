const itemTransactionController = require("../../controllers/stock/itemTransactionController");
const express = require("express");

const router = express.Router();

router.get("/history", itemTransactionController.getAll);

module.exports = router;
