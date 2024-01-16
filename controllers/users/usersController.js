//jshint esversion:9
const { Op } = require("sequelize");
const { User, Employee, Position } = require("../../database/models");

exports.getAllUsers = async (req, res) => {
	try {
		const users = await User.findAll({
			include: [{ model: Employee, include: [{ model: Position }] }],
		});
		res.status(200).json({
			status: "Success",
			data: users,
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			status: "request failed",
			message: "error creating user",
		});
	}
};

exports.getUser = async (req, res) => {
	const { username } = req.params;
	if (!username) {
		return res.status(400).json({
			status: "failed",
			message: "please provide username",
		});
	}
	try {
		const user = await User.findAll({
			where: { username },
		});
		return res.status(200).json({
			status: "success",
			data: user,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			status: "server error",
			message: "server error",
			data: { error },
		});
	}
};

exports.updateUser = async (req, res) => {
	const { userId } = req.body;
	if (userId) {
		return res.status(400).json({
			status: "request failed",
			message: "Please provide the user ID",
		});
	}
	try {
		const updateFields = req.body;
		const updatedUser = await User.update(
			{ ...updateFields },
			{ where: { id: userId } }
		);
		return res.status(202).json({
			status: "success",
			data: updatedUser,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			status: "request failed",
			message: "server error",
		});
	}
};
