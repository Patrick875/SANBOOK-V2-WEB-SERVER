const express = require("express");
const unitsController = require("./../../controllers/stock/unitsController");

const router = express.Router();

router.get("/units", unitsController.getAll);
router.post("/units", unitsController.create);
router.post("/units/equivalence", unitsController.addEquivalence);

module.exports = router;
