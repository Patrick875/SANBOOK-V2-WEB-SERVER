//jshint esversion:9
const express = require("express");
const morgan = require("morgan");
const userRoutes = require("./routes/User");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/", userRoutes);

module.exports = app;
