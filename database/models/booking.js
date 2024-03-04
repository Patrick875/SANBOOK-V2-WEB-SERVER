const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Booking extends Model {
		static associte(models) {
			//associations
			this.belongsTo(models.Guest, { foreignKey: "guest" });
			this.belongsTo(model.Room, { foreignKey: "room" });
		}
	}
	Booking.init(
		{
			refId: DataTypes.UUID,
			guest: DataTypes.INTEGER,
			room: DataTypes.INTEGER,
			numberOfAdults: DataTypes.INTEGER,
			numberOfChildren: DataTypes.INTEGER,
			checkinDate: DataTypes.DATE,
			checkoutDate: DataTypes.DATE,
			commingFrom: DataTypes.STRING,
			goingTo: DataTypes.STRING,
			datesIn: DataTypes.ARRAY(DataTypes.DATE),
		},
		{ sequelize, tableName: "bookings", modelName: "Booking" }
	);
	return Booking;
};
