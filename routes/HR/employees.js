//jshint esversion:9
const express = require("express");
const router = express.Router();
const {
	create,
	getAll,
	getOne,
	deleteAll,
	deleteOne,
} = require("../../controllers/HR/employeesController");

router.post("/employees/", create);
router.get("/employees/", getAll);
router.get("/employees/:id", getOne);
router.delete("/employees/", deleteAll);
router.delete("/employees/:emId", deleteOne);

module.exports = router;
