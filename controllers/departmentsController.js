//jshint esversion:9
const { Department } = require("../database/models");
exports.getAll = async (req, res) => {
	try {
		const allDeps = await Department.findAll();
		return res.status(200).json({
			status: "success",
			data: allDeps,
			length: allDeps.length,
		});
	} catch (err) {
		console.log(err);
		return res.status(400).json({
			status: "failed",
			message: "All getting all departments",
		});
	}
};

exports.create = async (req, res) => {
	const { name, description } = req.body;
	if (!name || !description) {
		return res.status(400).json({
			status: "failed",
			message: "please provide all required fields",
		});
	}
	try {
		const depid = name.substring(0, 3) + "dpmnt";

		const dep = await Department.create({
			name,
			description,
			depid,
			createdBy: req.headers.userId || req.headers.userid,
		});
		return res.status(201).json({
			status: "department created successfuly",
			data: dep,
		});
	} catch (err) {
		console.log(err);
		return res.status(400).json({
			status: "failed",
			message: "error creating department",
		});
	}
};

exports.deleteOne = async (req, res) => {
	const { depId } = req.params;
	if (!depId) {
		return res.status(400).json({
			status: "request failed",
			message: "please provide the id of the department",
		});
	}
	try {
		const dep = await Department.findByPk(depId);
		await dep.destroy({ cascade: true });
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			status: "server error",
			message: "error deleting deparment",
		});
	}
};

exports.deleteAll = async (req, res) => {
	try {
		await Department.truncate({ cascade: true });
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			status: "server error",
			message: "error deleting deparment",
		});
	}
};
