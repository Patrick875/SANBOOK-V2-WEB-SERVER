"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Department extends Model {
		static associate(models) {
			// define association here
			this.belongsTo(models.User, { foreignKey: "createdby" });
		}
	}
	Department.init(
		{
			name: DataTypes.STRING,
			depid: DataTypes.STRING,
			description: DataTypes.STRING,
			createdby: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Department",
			tableName: "departments",
		}
	);
	return Department;
};
