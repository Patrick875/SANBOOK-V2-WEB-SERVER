//jshint esversion:9
const express = require("express");
const router = express.Router();
const {
	getDashboardData,
} = require("../../controllers/HR/hrDashboardController");

router.get("/dashboard", getDashboardData);

module.exports = router;
