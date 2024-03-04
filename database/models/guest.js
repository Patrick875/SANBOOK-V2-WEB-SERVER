const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Guest extends Model {
		static associate(models) {
			this.hasMany(models.Booking, { foreignKey: "guest" });
			// associations
		}
	}
	Guest.init(
		{
			firstname: DataTypes.STRING,
			lastname: DataTypes.STRING,
			email: DataTypes.STRING,
			tel: DataTypes.STRING,
			placeOfBirth: DataTypes.STRING,
			nationality: DataTypes.STRING,
			residency: DataTypes.STRING,
			bookedFrom: DataTypes.INTEGER,
			company: DataTypes.STRING,
			passportNumber: DataTypes.STRING,
			identitycardNumber: DataTypes.STRING,
			identificationIssuePlace: DataTypes.STRING,
			identificationIssueDate: DataTypes.DATE,
			profession: DataTypes.STRING,
			otherNote: DataTypes.STRING,
			creditCards: {
				type: DataTypes.ARRAY(DataTypes.JSONB),
			},
			fleights: {
				type: DataTypes.ARRAY(DataTypes.JSONB),
			},
		},
		{ sequelize, tableName: "guests", modelName: "Guest" }
	);
	return Guest;
};
