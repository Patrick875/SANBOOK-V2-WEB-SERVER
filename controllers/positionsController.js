//jshint esversion:9
const crypto = require("crypto");
const {
	Position,
	SalaryAdvantage,
	SalaryDeduction,
	Department,
	Employee,
} = require("../database/models");
exports.getAll = async (req, res) => {
	try {
		const allPos = await Position.findAll({
			include: [
				{ model: Department },
				{ model: Employee },
				{ model: Position, as: "reportingPosition" }, // Include the reportingPosition relationship
				{ model: Position, as: "subordinates" },
			],
		});
		return res.status(200).json({
			status: "success",
			data: allPos,
			length: allPos.length,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			status: "failed",
			message: "All getting all positions",
		});
	}
};

exports.create = async (req, res) => {
	const {
		name,
		department,
		duties,
		netSallary,
		reportsTo,
		grossSalary,
		salaryAdvs,
		salaryDeds,
	} = req.body;
	if (!name || !department || !duties) {
		return res.status(400).json({
			status: "failed",
			message: "please provide all required fields",
		});
	}
	try {
		const posid = crypto.randomUUID().substring(0, 12);
		const pos = await Position.create({
			name,
			posid,
			department,
			duties,
			netSallary,
			reportsTo: reportsTo === "" ? null : reportsTo,
			grossSalary,
			createdBy: req.headers.userId || req.headers.userid,
		});

		if (pos) {
			if (salaryDeds && salaryDeds.length > 0) {
				const salaryDeductions = await SalaryDeduction.findAll({
					where: {
						id: salaryDeds,
					},
				});

				await pos.addSalaryDeductions(salaryDeductions);
			}
			if (salaryDeds && salaryDeds.length > 0) {
				const salaryAdvantages = await SalaryAdvantage.findAll({
					where: {
						id: salaryAdvs,
					},
				});

				await pos.addSalaryAdvantages(salaryAdvantages);
			}

			if (reportsTo) {
				// Find the reporting position by ID
				const reportingPosition = await Position.findByPk(reportsTo);

				// If the reporting position exists, associate it with the created position
				if (reportingPosition) {
					await pos.setReportingPosition(reportingPosition);
				}
			}
		}
		return res.status(201).json({
			status: "Position created successfuly",
			data: pos,
		});
	} catch (err) {
		console.log(err);
		return res.status(400).json({
			status: "failed",
			message: "error creating Position",
		});
	}
};

exports.deleteOne = async (req, res) => {
	const { posId } = req.params;
	if (!posId) {
		return res.status(400).json({
			status: "request failed",
			message: "please provide the id of the position",
		});
	}
	try {
		const pos = await Position.findByPk(depId);
		await pos.destroy({ cascade: true });
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			status: "server error",
			message: "error deleting position",
		});
	}
};

exports.deleteAll = async (req, res) => {
	try {
		await Position.truncate({ cascade: true });
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			status: "server error",
			message: "error deleting deparment",
		});
	}
};
