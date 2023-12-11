//jshint esversion:9
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Position extends Model {
		static associate(models) {
			this.belongsTo(models.Department, { foreignKey: "department" }),
				this.belongsToMany(models.SalaryAdvantage, {
					through: models.SalaryAdvPos,
				});
			this.hasMany(models.Employee, { foreignKey: "position" });
			this.belongsToMany(models.SalaryDeduction, {
				through: models.SalaryDedPos,
			});
			// Self-referencing association
			this.belongsTo(models.Position, {
				foreignKey: "reportsTo",
				as: "reportingPosition",
			});
			this.hasMany(models.Position, {
				foreignKey: "reportsTo",
				as: "subordinates",
			});
		}
	}
	Position.init(
		{
			name: DataTypes.STRING,
			posid: DataTypes.STRING(12),
			department: DataTypes.INTEGER,
			duties: DataTypes.ARRAY(DataTypes.STRING),
			netSallary: DataTypes.DECIMAL,
			grossSalary: DataTypes.DECIMAL,
			reportsTo: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			createdBy: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Position",
			tableName: "positions",
		}
	);
	return Position;
};
