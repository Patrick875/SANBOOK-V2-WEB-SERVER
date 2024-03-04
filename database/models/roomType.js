const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class RoomType extends Model {
		static associate(models) {
			this.hasMany(models.Room, { foreignKey: "type" });
			this.hasMany(models.RoomRate, { foreignKey: "roomType" });
		}
	}
	RoomType.init(
		{
			name: DataTypes.STRING,
			icon: DataTypes.STRING,
			code: DataTypes.STRING,
			numberofchildren: DataTypes.INTEGER,
			numberofadults: DataTypes.INTEGER,
			smockingallowed: DataTypes.BOOLEAN,
			active: DataTypes.BOOLEAN,
			bedtype: DataTypes.STRING,
		},
		{ sequelize, modelName: "RoomType", tableName: "roomtypes" }
	);
	return RoomType;
};
