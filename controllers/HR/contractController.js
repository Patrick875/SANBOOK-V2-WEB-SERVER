//jshint esversion:9
const { Op } = require("sequelize");
const { EmployeeContract, Employee } = require("../../database/models");
const { generateRandomString } = require("../../utils/randomStringGenerator");
exports.getAll = async (req, res) => {
	try {
		const allContracts = await EmployeeContract.findAll({
			include: [{ model: Employee }, { model: EmployeeContract }],
		});
		return (
			res.status(200),
			json({
				status: "success",
				data: allContracts,
				length: data.length,
			})
		);
	} catch (err) {
		return res.status(500).json({
			status: "failed",
			message: "Request failed due to server error",
		});
	}
};

exports.create = async (req, res) => {
	const { employee } = req.body;
	if (!employee) {
		return res.status(400).json({
			status: "request failed",
			message: "employee is required",
		});
	}
	try {
		const employeeFromDB = await Employee.findOne({ where: { id: employee } });
		if (!employeeFromDB) {
			return res.status(404).json({
				status: "request failed",
				message: "employee not found",
			});
		}
		const contractId = generateRandomString(12);
		const contract = await EmployeeContract.create({ ...req.body, contractId });
		return res.status(201).json({
			status: "success",
			data: contract,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			status: "request failed",
			message: "request failed due to server error",
		});
	}
};

exports.getOne = async (req, res) => {
	const { employeeId, contractId } = req.query;
	if (!employeeId && !contractId) {
		return res.status(400).json({
			status: "request failed",
			message: "you have to provide either the employeeId or contractId",
		});
	}
	try {
		const contract = await EmployeeContract.findOne({
			where: {
				[Op.or]: { employee: employeeId, id: contractId },
			},
		});
		return res.status(200).json({
			status: "success",
			data: contract,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			status: "request failed",
			message: "server error occured",
		});
	}
};

exports.update = async (req, res) => {
	const { contractId } = req.body;
	if (!contractId) {
		return res.status(400).json({
			status: "request failed",
			message: "contractId is required",
		});
	}
	try {
		const contract = await EmployeeContract.findOne({
			where: { id: contractId },
		});
		if (!contract) {
			return res.status(404).json({
				status: "not found",
				message: "contract not found in db ",
			});
		}
		await EmployeeContract.update(
			{ ...req.body },
			{
				where: {
					id: contractId,
				},
			}
		);
		const newUpdate = await EmployeeContract.findOne({
			where: { id: contractId },
		});
		return res.status(200).json({
			status: "success",
			data: newUpdate,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			status: "request failed",
			message: "request failed due to server error",
		});
	}
};
