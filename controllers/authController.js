//jshint esversion:9
const { User } = require("../database/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const signToken = (id) =>
	jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});

const sendToken = (user, statusCode, res) => {
	const token = signToken(user.id);
	user.password = undefined;
	res.status(statusCode).json({
		status: "Success",
		token,
		user,
	});
};

exports.login = async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json({
			status: "bad request",
			message: "provide all required fields",
		});
	}
	try {
		const user = await User.findOne({
			where: { [Op.or]: [{ username }, { email: username }] },
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
		});
		if (!user) {
			return res.status(404).json({
				status: "request failed",
				message: "user not found",
			});
		}
		if (!(await bcrypt.compare(password, user.password))) {
			return res.status(400).json({
				status: "fail",
				message: "incorrect email or password",
			});
		}
		sendToken(user, 200, res);
	} catch (error) {
		console.log(error);
		res.status(400).json({
			status: "request failed",
			data: error,
		});
	}
};

exports.signup = async (req, res) => {
	const { username, email, password } = req.body;
	if (!username || !email || !password) {
		return res.status(400).json({
			status: "bad request",
			message: "provide all required fields",
		});
	}
	try {
		const newuser = await User.create({
			username,
			password,
			email,
		});
		res.status(201).json({
			status: "Success",
			data: newuser,
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			status: "request failed",
			message: "error creating user",
		});
	}
};
