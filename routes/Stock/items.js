//jshint esversion:9
const express = require("express");
const itemsController = require("./../../controllers/stock/itemsController");

const router = express.Router();

router.get("/items", itemsController.getAll);
router.post("/items", itemsController.create);

module.exports = router;
