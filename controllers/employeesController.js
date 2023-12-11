//jshint esversion:9
const { Position, Employee, User, Department } = require("../database/models");
exports.getAll = async (req, res) => {
	try {
		const allEms = await Employee.findAll({
			include: [{ model: Department }, { model: Position }],
		});
		return res.status(200).json({
			status: "success",
			data: allEms,
			length: allEms.length,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			status: "failed",
			message: "All getting all employees",
		});
	}
};
exports.getOne = async (req, res) => {
	console.log(req);
	const { id } = req.params;
	try {
		const employee = await Employee.findOne({
			where: { id },
			include: [
				{ model: Department },
				{
					model: Position,
					include: [{ model: Position, as: "reportingPosition" }],
				},
			],
		});

		if (!employee) {
			return res.status(404).json({
				status: "not found",
				message: "employee not found",
			});
		}
		return res.status(200).json({
			status: "success",
			data: employee,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			status: "failed",
			message: "Error geting employee",
		});
	}
};

exports.create = async (req, res) => {
	const {
		fullname,
		birthdate,
		gender,
		maritalstatus,
		identification,
		nationality,
		residence_province,
		residence_district,
		telephone,
		whatsapphone,
		otherphone,
		email,
		emergencyphone,
		emergencyrelation,
		department,
		position,
		employmenttype,
		createdby,
	} = req.body;
	if (
		!fullname ||
		!department ||
		!maritalstatus ||
		!position ||
		!identification ||
		!birthdate ||
		!gender
	) {
		return res.status(400).json({
			status: "failed",
			message: "please provide all required fields",
		});
	}

	try {
		const users = await User.findAll();

		const regId = "0000" + users[users.length - 1].id + 1;
		const em = await Employee.create({
			fullname,
			birthdate,
			gender,
			regId,
			maritalstatus,
			identification,
			nationality,
			residence_province,
			residence_district,
			telephone,
			whatsapphone,
			otherphone,
			email,
			emergencyphone,
			emergencyrelation,
			department,
			position,
			employmenttype,
			createdby,
			createdBy: req.headers.userId || req.headers.userid,
		});

		return res.status(201).json({
			status: "Employee created successfuly",
			data: em,
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
	const { emId } = req.params;
	if (!emId) {
		return res.status(400).json({
			status: "request failed",
			message: "please provide the id of the position",
		});
	}
	try {
		const em = await Employee.findByPk(depId);
		await em.destroy({ cascade: true });
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			status: "server error",
			message: "error deleting employee",
		});
	}
};

exports.deleteAll = async (req, res) => {
	try {
		await Employee.truncate({ cascade: true });
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			status: "server error",
			message: "error deleting employees",
		});
	}
};
