"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class EmployeeWarning extends Model {
		static associate(models) {
			this.belongsTo(models.Employee, { foreignKey: "employeeId" });
		}
	}
	EmployeeWarning.init(
		{
			employeeId: DataTypes.INTEGER,
			title: DataTypes.STRING,
			description: DataTypes.STRING,
			issuedon: DataTypes.STRING,
			updatedon: DataTypes.STRING,
			createdBy: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelname: "EmployeeWarning",
			tableName: "employeewarnings",
		}
	);
	return EmployeeWarning;
};
