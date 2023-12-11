"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class SalaryDeduction extends Model {
		static associate(models) {
			this.belongsTo(models.User, { foreignKey: "createdBy" });
			this.belongsToMany(models.Position, {
				through: models.SalaryDedPos,
			});
		}
	}
	SalaryDeduction.init(
		{
			name: DataTypes.STRING,
			percentage: { type: DataTypes.DECIMAL, allowNull: true },
			amount: { type: DataTypes.DECIMAL, allowNull: true },
			active: DataTypes.BOOLEAN,
			createdBy: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "SalaryDeduction",
			tableName: "salarydeductions",
		}
	);
	return SalaryDeduction;
};
