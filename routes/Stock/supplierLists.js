const express = require("express");
const supplierListController = require("./../../controllers/stock/supplierListController");

const router = express.Router();

router.get("/supplierlists/:id", supplierListController.getOne);
router.get("/supplierlists/search/:id", supplierListController.search);
router.delete("/supplierlists", supplierListController.deleteAll);

module.exports = router;
