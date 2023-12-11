"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class PositionLevel extends Model {
		static associate(models) {}
	}
	PositionLevel.init(
		{
			name: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "PositionLevel",
			tableName: "positionlevels",
		}
	);
	return PositionLevel;
};
