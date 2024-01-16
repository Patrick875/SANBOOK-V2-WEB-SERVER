//jshint esversion:9
const { EmployeeRequest, Employee } = require("../../database/models");

exports.create = async (req, res) => {
	const { employeeId, type } = req.body;

	if (!employee && !type) {
		return res.status(400).json({
			status: "request failed",
			message: "employee id and reason are required",
		});
	}
	try {
		const worker = await Employee.findOne({ where: { id: employeeId } });
		if (!worker) {
			return res.status(404).json({
				status: "request failed",
				message: "employee with id doesn't exist",
			});
		}
		const request = await EmployeeRequest.create(req.body);

		return res.status(201).json({
			status: "request submitted successfully",
			data: request,
		});
	} catch (err) {
		console.log("err", err);
		res.status(500).json({
			status: "request failed",
			message: "server error",
		});
	}
};
exports.getAll = async (req, res) => {
	try {
		const requests = await EmployeeRequest.findAll();
		return res.status(200).json({
			status: "success",
			data: requests,
		});
	} catch (err) {
		console.log("err", err);
		res.status(500).json({
			status: "request failed",
			message: "server error",
		});
	}
};

exports.getEmployeeRequests = async (req, res) => {
	const { employeeId } = req.body;
	if (!employeeId) {
		return res.status(400).json({
			status: "request failed",
			message: "employeeId is  required",
		});
	}
	try {
		const allUserHRRequests = await EmployeeRequest.findAll({
			where: { employee: employeeId },
		});
		return res.status(200).json({
			status: "success",
			data: allUserHRRequests,
		});
	} catch (err) {
		console.log("err", err);
		res.status(500).json({
			status: "request failed",
			message: "server error",
		});
	}
};

exports.update = async (req, res) => {
	const { requestId } = req.body;
	if (!requestId) {
		return res.status(400).json({
			status: "request failed",
			message: "requestId is  required",
		});
	}
	try {
		const request = await EmployeeRequest.findOne({ where: { id: requestId } });
		if (!request) {
			return res.status(400).json({
				status: "request failed",
				message: "requestId is required",
			});
		}
		await EmployeeRequest.update(
			{ ...req.body },
			{
				where: {
					id: requet.id,
				},
			}
		);

		return res.status(203).json({
			status: "success",
			message: "request updated",
		});
	} catch (err) {
		console.log("err", err);
		res.status(500).json({
			status: "request failed",
			message: "server error",
		});
	}
};

exports.deleteOne = async (req, res) => {
	const { requestId } = req.body;
	if (!requestId) {
		return res.status(400).json({
			status: "request failed",
			message: "requestId is required",
		});
	}
	try {
		const request = await EmployeeRequest.findOne({ where: { id: requestId } });
		if (!request) {
			return res.status(404).json({
				status: "request failed",
				message: "request not found ",
			});
		}
		await EmployeeRequest.destroy({
			where: { id: requstId },
		});
	} catch (err) {
		console.log("err", err);
		res.status(500).json({
			status: "request failed",
			message: "server error",
		});
	}
};

exports.deleteAll = async (req, res) => {
	try {
		await EmployeeRequest.truncate();
	} catch (err) {
		console.log("err", err);
		res.status(500).json({
			status: "request failed",
			message: "server error",
		});
	}
};
