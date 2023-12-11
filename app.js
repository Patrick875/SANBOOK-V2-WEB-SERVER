//jshint esversion:9
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const userRoutes = require("./routes/User");
const departmentRoutes = require("./routes/HR/departments");
const positionRoutes = require("./routes/HR/positions");
const employeeRoutes = require("./routes/HR/employees");
const systemRoutes = require("./routes/System");

morgan.token("json", (req, res) => {
	return JSON.stringify({
		"remote-address": req.ip,
		date: new Date().toISOString(),
		method: req.method,
		username: req.headers.username ? req.headers.username : "",
		url: req.url,
		"http-version": req.httpVersion,
		status: res.statusCode,
		"user-agent": req.headers["user-agent"],
	});
});

const accessLogs = fs.createWriteStream(path.join(__dirname, "access.log"), {
	flags: "a",
});
const app = express();

app.use(morgan("dev"));
app.use(morgan(":json", { stream: accessLogs }));

app.use(express.json());
app.use(cors());
app.options("*", cors());

app.use("/api/v1/", userRoutes);
app.use("/api/v1/hr", departmentRoutes);
app.use("/api/v1/hr", positionRoutes);
app.use("/api/v1/hr", employeeRoutes);
app.use("/api/v1/system", systemRoutes);

module.exports = app;
