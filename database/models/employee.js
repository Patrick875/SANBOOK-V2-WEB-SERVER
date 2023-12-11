"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Employee extends Model {
		static associate(models) {
			this.belongsTo(models.Department, { foreignKey: "department" });
			this.belongsTo(models.Position, { foreignKey: "position" });
		}
	}
	Employee.init(
		{
			fullname: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			birthdate: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			gender: {
				type: DataTypes.ENUM("male", "female", "not stated"),
				allowNull: false,
			},
			maritalstatus: {
				type: DataTypes.ENUM("single", "married"),
				allowNull: false,
			},
			identification: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			nationality: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			residence_province: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			residence_district: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			telephone: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			whatsapphone: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			otherphone: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			emergencyphone: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			emergencyrelation: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			department: DataTypes.INTEGER,
			position: DataTypes.INTEGER,
			employmenttype: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: "full-time",
			},
			status: {
				type: DataTypes.ENUM("active", "on leave", "suspended"),
				allowNull: false,
				defaultValue: "active",
			},
			regId: DataTypes.STRING,
			createdby: DataTypes.INTEGER,
		},
		{ sequelize, tableName: "employees", modelName: "Employee" }
	);
	return Employee;
};
