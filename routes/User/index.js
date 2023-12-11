//jshint esversion:9
const express = require("express");
const router = express.Router();
const { login, signup } = require("../../controllers/authController");
const {
	getAllUsers,
	getUser,
	updateUser,
} = require("../../controllers/usersController");

router.post("/signup", signup);
router.post("/login", login);
router.get("/allusers", getAllUsers);
router.patch("/users/", updateUser);
router.get("/users/:username", getUser);

module.exports = router;
