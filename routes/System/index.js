//jshint esversion:9
const path = require("path");
const fs = require("fs");
const express = require("express");
const router = express.Router();

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

module.exports = router;
