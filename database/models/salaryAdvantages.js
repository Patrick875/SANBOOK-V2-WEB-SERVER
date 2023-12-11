"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class SalaryAdvantage extends Model {
		static associate(models) {
			this.belongsToMany(models.Position, {
				through: models.SalaryAdvPos,
			});
		}
	}
	SalaryAdvantage.init(
		{
			name: DataTypes.STRING,
			percentage: { type: DataTypes.DECIMAL, allowNull: true },
			amount: { type: DataTypes.DECIMAL, allowNull: true },
			active: DataTypes.BOOLEAN,
			createdBy: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "SalaryAdvantage",
			tableName: "salaryadvantages",
		}
	);
	return SalaryAdvantage;
};
