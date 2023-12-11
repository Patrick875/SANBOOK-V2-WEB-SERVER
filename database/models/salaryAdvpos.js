"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class SalaryAdvPos extends Model {}
	SalaryAdvPos.init(
		{},
		{
			sequelize,
			modelName: "SalaryAdvPos",
			tableName: "salaryadv_pos",
		}
	);
	return SalaryAdvPos;
};
