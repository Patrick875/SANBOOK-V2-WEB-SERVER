//jshint esversion:9
const { SalaryAdvantage } = require("../../database/models");
exports.getAll = async (req, res) => {
	try {
		const allAdvs = await SalaryAdvantage.findAll();
		return res.status(200).json({
			status: "success",
			data: allAdvs,
			length: allAdvs.length,
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
		console.log(req.headers);
		const adv = await SalaryAdvantage.create({
			name,
			percentage,
			amount,
			active: true,
			createdBy: req.headers.userid || req.headers.userid,
		});
		return res.status(201).json({
			status: "SalaryAdvantage created successfuly",
			data: adv,
		});
	} catch (err) {
		console.log(err);
		return res.status(400).json({
			status: "failed",
			message: "error creating SalaryAdvantage",
		});
	}
};

exports.deleteOne = async (req, res) => {
	const { advId } = req.params;
	if (!advId) {
		return res.status(400).json({
			status: "request failed",
			message: "please provide the id of the SalaryAdvantage",
		});
	}
	try {
		const adv = await SalaryAdvantage.findByPk(depId);
		await adv.destroy({ cascade: true });
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
		await SalaryAdvantage.truncate({ cascade: true });
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			status: "server error",
			message: "error deleting deparment",
		});
	}
};
