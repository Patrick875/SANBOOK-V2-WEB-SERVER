const { EmployeeWarning } = require("../../database/models");

exports.create = async (req, res) => {
	//for notifications
	//add the employee to get notified
	//add logic for the cc email to be notified also

	const { employeeId, title, description, cc, issuedon } = req.body;
	if (!employeeId || !title || !description) {
		return res.status(400).json({
			status: "Request failed",
			message: "EmployeedId ,title and  description are required ",
		});
	}
	try {
		const warning = await EmployeeWarning.create({
			employeeId,
			description,
			title,
			cc,
			issuedon,
			createdBy: req.headers.userId || req.headers.userid,
		});
		return res.status(201).json({
			status: "success",
			data: warning,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			status: "request failed",
			message: "server error",
		});
	}
};
exports.getEmployeeWarnings = async (req, res) => {
	const { emId } = req.params;
	if (!emId) {
		return res.status(400).json({
			status: "request failed",
			message: "employeeId is required",
		});
	}
	try {
		const warnings = await EmployeeWarning.findAll({
			where: { employeeId: emId },
		});
		return res.status(200).json({
			status: "success",
			data: warnings,
			length: warnings.length,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			status: "request failed",
			message: "server error",
		});
	}
};
