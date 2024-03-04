const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Room extends Model {
		static associate(models) {
			this.hasMany(models.Booking, { foreignKey: "room" });
			this.belongsTo(models.RoomType, { foreignKey: "roomType" });
		}
	}
	Room.init(
		{
			type: DataTypes.INTEGER,
			name: DataTypes.STRING,
			receptionStatus: {
				type: DataTypes.ENUM("reserved", "out of order", "occupied", "free"),
			},
			houseKeepingStatus: {
				type: DataTypes.ENUM("ready", "out of order", "in-cleaning"),
			},
			location: DataTypes.STRING,
		},
		{ sequelize, modelName: "Room", tableName: "rooms" }
	);

	return Room;
};
