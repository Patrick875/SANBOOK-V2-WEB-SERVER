const express = require("express");
const purchaseOrderController = require("./../../controllers/stock/purchaseOrderController");
const router = express.Router();

router.get("/purchaseorder", purchaseOrderController.getAll);
router.get("/purchaseorder/:id", purchaseOrderController.getOne);
router.get("/purchaseorder/rec/:id", purchaseOrderController.getOneForReceiver);
router.post("/purchaseorder", purchaseOrderController.create);
router.patch("/purchaseorder/:id", purchaseOrderController.update);
router.delete("/purchaseorder", purchaseOrderController.deleteAll);

module.exports = router;
