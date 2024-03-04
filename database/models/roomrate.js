const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class RoomRate extends Model {
		static associate(models) {
			this.belongsTo(models.RoomType, { foreignKey: "roomType" });
		}
	}
	RoomRate.init(
		{
			roomType: DataTypes.INTEGER,
			name: DataTypes.STRING,
			value: DataTypes.FLOAT,
		},
		{ sequelize, modelName: "RoomRate", tableName: "room_rates" }
	);

	return RoomRate;
};
