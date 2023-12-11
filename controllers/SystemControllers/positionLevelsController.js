//jshint esversion:9
const { PositionLevel } = require("../../database/models");
exports.getAll = async (req, res) => {
	try {
		const allLvs = await PositionLevel.findAll();
		return res.status(200).json({
			status: "success",
			data: allLvs,
			length: allLvs.length,
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
	const { name } = req.body;
	if (!name) {
		return res.status(400).json({
			status: "failed",
			message: "please provide all required fields",
		});
	}
	try {
		const pos = await PositionLevel.create({
			name,
			createdBy: req.headers.userId,
		});
		return res.status(201).json({
			status: "PositionLevel created successfuly",
			data: pos,
		});
	} catch (err) {
		console.log(err);
		return res.status(400).json({
			status: "failed",
			message: "error creating PositionLevel",
		});
	}
};

exports.deleteOne = async (req, res) => {
	const { lvId } = req.params;
	if (!lvId) {
		return res.status(400).json({
			status: "request failed",
			message: "please provide the id of the PositionLevel",
		});
	}
	try {
		const lv = await PositionLevel.findByPk(lvId);
		await lv.destroy({ cascade: true });
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
		await PositionLevel.truncate({ cascade: true });
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			status: "server error",
			message: "error deleting deparment",
		});
	}
};
