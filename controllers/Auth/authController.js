//jshint esversion:9
const {
	User,
	Employee,
	Department,
	Position,
} = require("../../database/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { generateRandomString } = require("../../utils/randomStringGenerator");
const { asyncWrapper } = require("../../utils/asyncWrapper");

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

exports.login = asyncWrapper(async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json({
			status: "bad request",
			message: "provide all required fields",
		});
	}

	const user = await User.findOne({
		where: { [Op.or]: [{ username }, { email: username }] },
		include: [
			{
				model: Employee,
				include: [{ model: Position }, { model: Department }],
			},
		],
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
	if (!user.status) {
		return res.status(400).json({
			status: "fail",
			message: "Access by user unauthorized",
		});
	}

	sendToken(user, 200, res);
});

exports.signup = asyncWrapper(async (req, res) => {
	const { username, email, role, employeeId } = req.body;
	if (!username || !email) {
		return res.status(400).json({
			status: "bad request",
			message: "provide all required fields",
		});
	}
	const isEmailInUse = await User.findOne({ where: { email: email } });
	if (isEmailInUse) {
		return res.status(400).json({
			status: "Bad Request",
			message: "Email is already in use",
		});
	}
	const employee = await Employee.findOne({
		where: { id: employeeId },
		include: [{ model: Department }],
	});

	if (!employee) {
		return res.status(404).json({
			status: "Employee Not found",
			message: "Employee must be already existing to create the user",
		});
	}

	const userpassword = await bcrypt.hash("1234567890", 14);
	const newuser = await User.create({
		username,
		password: userpassword,
		email,
		employeeId,
		status: true,
		//role: employee.Department.role,
		createdBy: req.headers.userId || req.headers.userid,
	});
	res.status(201).json({
		status: "Success",
		data: newuser,
	});
});

exports.resetPassword = asyncWrapper(async (req, res) => {
	const { user } = req.body;
	if (!user) {
		return res.status(400).json({
			status: "failed",
			message: "please provide your email or username",
		});
	}

	const foundUser = await User.findOne({
		where: { [Op.or]: [{ username: user }, { email: user }] },
	});
	if (!foundUser) {
		return res.status(404).json({
			status: "request failed",
			message: "User not found",
		});
	}
	const newRandomPassword = "password";
	const hashedNew = await bcrypt.hash(newRandomPassword, 12);
	await User.update({ password: hashedNew }, { where: { id: foundUser.id } });

	res.status(203).json({
		status: "success",
		message: "password reset",
	});
});
