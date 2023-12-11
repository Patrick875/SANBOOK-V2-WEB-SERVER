"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class SalaryDedPos extends Model {}
	SalaryDedPos.init(
		{},
		{
			sequelize,
			modelName: "SalaryDedPos",
			tableName: "salaryded_pos",
		}
	);
	return SalaryDedPos;
};
