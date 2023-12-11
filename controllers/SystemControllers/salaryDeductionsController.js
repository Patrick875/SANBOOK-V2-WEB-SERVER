//jshint esversion:9
const { SalaryDeduction } = require("../../database/models");
exports.getAll = async (req, res) => {
	try {
		const allDeds = await SalaryDeduction.findAll();
		return res.status(200).json({
			status: "success",
			data: allDeds,
			length: allDeds.length,
		});
	} catch (err) {
		console.log(err);
		return res.status(400).json({
			status: "failed",
			message: "All getting all PositionLevels",
		});
	}
};

exports.create = async (req, res) => {
	const { name, percentage, amount } = req.body;
	if (!name || !amount) {
		return res.status(400).json({
			status: "failed",
			message: "please provide all required fields",
		});
	}
	try {
		const ded = await SalaryDeduction.create({
			name,
			percentage,
			amount,
			active: true,
			createdBy: req.headers.userid || req.headers.userId,
		});
		return res.status(201).json({
			status: "SalaryDeduction created successfuly",
			data: ded,
		});
	} catch (err) {
		console.log(err);
		return res.status(400).json({
			status: "failed",
			message: "error creating SalaryDeduction",
		});
	}
};

exports.deleteOne = async (req, res) => {
	const { dedId } = req.params;
	if (!dedId) {
		return res.status(400).json({
			status: "request failed",
			message: "please provide the id of the SalaryDeduction",
		});
	}
	try {
		const ded = await SalaryDeduction.findByPk(depId);
		await ded.destroy({ cascade: true });
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
		await SalaryDeduction.truncate({ cascade: true });
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			status: "server error",
			message: "error deleting deparment",
		});
	}
};
