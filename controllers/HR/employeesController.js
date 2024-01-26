//jshint esversion:9
const {
	Position,
	Employee,
	EmployeeContract,
	SalaryAdvantage,
	SalaryDeduction,
	User,
	Department,
} = require("../../database/models");
const { asyncWrapper } = require("../../utils/asyncWrapper");
const createController = require("../controllerFactory");
exports.getAll = asyncWrapper(async (req, res) => {
	const allEms = await Employee.findAll({
		include: [
			{ model: Department },
			{
				model: Position,
				include: [{ model: SalaryAdvantage }, { model: SalaryDeduction }],
			},
		],
	});
	return res.status(200).json({
		status: "success",
		data: allEms,
		length: allEms.length,
	});
});
exports.getOne = asyncWrapper(async (req, res) => {
	const { id } = req.params;

	const employee = await Employee.findOne({
		where: { id },
		include: [
			{ model: Department },
			{ model: EmployeeContract },
			{
				model: Position,
				include: [
					{ model: Position, as: "reportingPosition" },
					{ model: SalaryAdvantage },
					{ model: SalaryDeduction },
					{ model: Department },
				],
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
});

exports.create = asyncWrapper(async (req, res) => {
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
		profileImage,
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
		profile: profileImage,
		createdBy: req.headers.userId || req.headers.userid,
	});

	return res.status(201).json({
		status: "Employee created successfuly",
		data: em,
	});
});

exports.deleteOne = asyncWrapper(async (req, res) => {
	const { emId } = req.params;
	if (!emId) {
		return res.status(400).json({
			status: "request failed",
			message: "please provide the id of the position",
		});
	}

	const em = await Employee.findByPk(depId);
	await em.destroy({ cascade: true });
});

exports.deleteAll = asyncWrapper(createController(Employee).deleteAll);
