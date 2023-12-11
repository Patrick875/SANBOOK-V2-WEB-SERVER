//jshint esversion:9
const path = require("path");
const fs = require("fs");
const express = require("express");
const router = express.Router();
const positionLevelController = require("../../controllers/SystemControllers/positionLevelsController");
const salaryAdvantagesController = require("../../controllers/SystemControllers/salaryAdvantagesController");
const salaryDeductionsController = require("../../controllers/SystemControllers/salaryDeductionsController");

router.get("/userlogs", (req, res) => {
	const logFilePath = path.join(process.env.ROOT_DIR, "access.log");
	fs.readFile(logFilePath, "utf8", (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).send("Error reading logs");
			return;
		}

		// Split the logs into an array

		const logsArray = data.trim().split("\n");

		// Send the logs as JSON array
		res
			.status(200)
			.json({ status: "sucsess", data: logsArray.map(JSON.parse) });
	});
});

//hr

router.get("/hr/levels", positionLevelController.getAll);
router.post("/hr/levels", positionLevelController.create);
router.delete("/hr/levels/:lvId", positionLevelController.deleteOne);
router.delete("/hr/levels", positionLevelController.deleteAll);

router.get("/hr/advs", salaryAdvantagesController.getAll);
router.post("/hr/advs", salaryAdvantagesController.create);
router.delete("/hr/advs/:advId", salaryAdvantagesController.deleteOne);
router.delete("/hr/advs", salaryAdvantagesController.deleteAll);

router.get("/hr/deds", salaryDeductionsController.getAll);
router.post("/hr/deds", salaryDeductionsController.create);
router.delete("/hr/deds/:dedId", salaryDeductionsController.deleteOne);
router.delete("/hr/deds", salaryDeductionsController.deleteAll);

module.exports = router;
