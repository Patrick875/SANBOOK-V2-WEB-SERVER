//jshint esversion:9
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const userRoutes = require("./routes/User");
const departmentRoutes = require("./routes/HR/departments");
const hrdashboardRoutes = require("./routes/HR/index");
const positionRoutes = require("./routes/HR/positions");
const employeeRoutes = require("./routes/HR/employees");
const employeeWarningRoutes = require("./routes/HR/warnings");
const systemRoutes = require("./routes/System");
const contractRouter = require("./routes/HR/contract");
const storesRouter = require("./routes/Stock/store");
const employeeRequestsRouter = require("./routes/HR/requests");
const itemCategoriesRouter = require("./routes/Stock/categories");
const unitsRouter = require("./routes/Stock/units");
const itemsRouter = require("./routes/Stock/items");
const purchaseorderRouter = require("./routes/Stock/purchaseorders");
const receiveVoucherRouter = require("./routes/Stock/receivevouchers");
const currentStockRouter = require("./routes/Stock/currentstock");
const supplierRouter = require("./routes/Stock/supplier");
const supplierListRouter = require("./routes/Stock/supplierLists");
const costingCenterRouter = require("./routes/Stock/costingcenter");
const costingCenterRequestRouter = require("./routes/Stock/costingcenterrequest");
const stockHistoryRouter = require("./routes/Stock/history");

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

app.use(express.json({ limit: "10mb" }));
app.use(cors());
app.options("*", cors());

app.use("/api/v1/", userRoutes);

app.use("/api/v1/hr", hrdashboardRoutes);
app.use("/api/v1/hr", departmentRoutes);
app.use("/api/v1/hr", positionRoutes);
app.use("/api/v1/hr", employeeRoutes);
app.use("/api/v1/hr", employeeRequestsRouter);
app.use("/api/v1/hr", employeeWarningRoutes);
app.use("/api/v1/hr", contractRouter);
app.use("/api/v1/stock", receiveVoucherRouter);
app.use("/api/v1/stock", purchaseorderRouter);
app.use("/api/v1/stock", storesRouter);
app.use("/api/v1/stock", itemCategoriesRouter);
app.use("/api/v1/stock", unitsRouter);
app.use("/api/v1/stock", itemsRouter);
app.use("/api/v1/stock", currentStockRouter);
app.use("/api/v1/stock", supplierRouter);
app.use("/api/v1/stock", supplierListRouter);
app.use("/api/v1/stock", costingCenterRouter);
app.use("/api/v1/stock", costingCenterRequestRouter);
app.use("/api/v1/stock", stockHistoryRouter);
app.use("/api/v1/system", systemRoutes);

module.exports = app;
