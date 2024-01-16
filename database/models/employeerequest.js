"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class EmployeeRequest extends Model {
		static associate(models) {
			this.belongsTo(models.Employee, { foreignKey: "employeeId" });
		}
	}
	EmployeeRequest.init(
		{
			employeeId: DataTypes.INTEGER,
			title: DataTypes.STRING,
			type: DataTypes.ENUM(
				"Leave",
				"Advance on Payment",
				"Appointment",
				"Other"
			),
			description: DataTypes.STRING,
			status: DataTypes.ENUM("submited", "approved", "denied"),
			submittedon: DataTypes.STRING,
			cc: DataTypes.STRING,
			updatedon: DataTypes.STRING,
			createdBy: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelname: "EmployeeRequest",
			tableName: "employeerequests",
		}
	);
	return EmployeeRequest;
};
