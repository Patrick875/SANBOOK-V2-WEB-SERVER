//jshint esversion:9
const express = require("express");
const router = express.Router();
const {
	create,
	getAll,
	deleteAll,
	deleteOne,
} = require("../../controllers/HR/positionsController");

router.post("/positions/", create);
router.get("/positions", getAll);
router.delete("/positions/:position", deleteOne);
router.delete("/positions/", deleteAll);

module.exports = router;
