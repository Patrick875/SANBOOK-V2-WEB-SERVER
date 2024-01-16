const { Employee, Department, Position } = require("../../database/models");

exports.getDashboardData = async (req, res) => {
	try {
		const employees = await Employee.findAll({
			include: [{ model: Position }],
		});
		const departments = await Department.findAll();

		return res.status(201).json({
			status: "success",
			data: { employees, departments },
		});
	} catch (err) {
		return res.status(500).json({
			status: "request failed",
			message: "server error",
		});
	}
};
