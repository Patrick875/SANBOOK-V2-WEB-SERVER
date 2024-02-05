"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Department extends Model {
		static associate(models) {
			// define association here
			this.belongsTo(models.User, { foreignKey: "createdby" });
			this.hasMany(models.Position, { foreignKey: "department" });
			this.hasMany(models.CostingCenter, { foreignKey: "department" });
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
