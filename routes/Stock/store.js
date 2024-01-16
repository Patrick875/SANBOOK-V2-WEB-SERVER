const express = require("express");
const storesController = require("./../../controllers/stock/storeController");

const router = express.Router();

router.get("/stores", storesController.getAll);
router.get("/stores/:id", storesController.getOne);
router.post("/stores", storesController.create);

module.exports = router;
