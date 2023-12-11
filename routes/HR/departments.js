//jshint esversion:9
const express = require("express");
const router = express.Router();
const { create, getAll } = require("../../controllers/departmentsController");

router.post("/departments/", create);
router.get("/departments/", getAll);

module.exports = router;
