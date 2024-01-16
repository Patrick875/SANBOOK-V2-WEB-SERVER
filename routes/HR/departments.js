//jshint esversion:9
const express = require("express");
const router = express.Router();
const {
	create,
	getAll,
	deleteOne,
} = require("../../controllers/HR/departmentsController");

router.post("/departments/", create);
router.get("/departments/", getAll);
router.delete("/departments/:depId", deleteOne);

module.exports = router;
