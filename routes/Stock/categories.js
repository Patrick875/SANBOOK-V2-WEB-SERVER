//jshint esversion:9
const express = require("express");
const itemCategoriesController = require("./../../controllers/stock/itemCategoriesController");

const router = express.Router();

router.get("/categories", itemCategoriesController.getAll);
router.post("/categories", itemCategoriesController.create);

module.exports = router;
