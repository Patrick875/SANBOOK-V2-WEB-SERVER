const express = require("express");
const suppliersController = require("./../../controllers/stock/suppliersController");

const router = express.Router();

router.get("/suppliers", suppliersController.getAll);
router.get("/suppliers/:id", suppliersController.getOne);
router.get("/suppliers/rec/:name", suppliersController.search);
router.post("/suppliers", suppliersController.create);

module.exports = router;
