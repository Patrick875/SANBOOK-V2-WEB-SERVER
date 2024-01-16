//jshint esversion:9
const express = require("express");
const router = express.Router();
const {
	login,
	signup,
	resetPassword,
} = require("../../controllers/Auth/authController");
const {
	getAllUsers,
	getUser,
	updateUser,
} = require("../../controllers/users/usersController");

router.post("/signup", signup);
router.post("/login", login);
router.post("/reset", resetPassword);
router.get("/allusers", getAllUsers);
router.patch("/users/", updateUser);
router.get("/users/:username", getUser);

module.exports = router;
