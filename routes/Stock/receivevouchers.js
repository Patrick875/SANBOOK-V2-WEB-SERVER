const express = require("express");
const receiveVoucherController = require("./../../controllers/stock/receiveVaucherController");
const router = express.Router();

router.get("/receivevaucher", receiveVoucherController.getAll);
router.get("/receivevaucher/:id", receiveVoucherController.getOne);
router.post("/receivevaucher", receiveVoucherController.create);
router.post("/receivevaucher/sup", receiveVoucherController.addFromSupplier);
router.patch("/receivevaucher/:id", receiveVoucherController.update);
router.delete("/receivevaucher", receiveVoucherController.deleteAll);

module.exports = router;
