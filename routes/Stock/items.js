//jshint esversion:9
const express = require("express");
const itemsController = require("./../../controllers/stock/itemsController");
const receiveVaucherController = require("./../../controllers/stock/receiveVaucherController");
const router = express.Router();

router.get("/items", itemsController.getAll);
router.get("/items/rec/:name", itemsController.search);
router.get(
	"/track/:stockItemId",
	receiveVaucherController.trackItemTransaction
);
router.post("/items", itemsController.create);

module.exports = router;
