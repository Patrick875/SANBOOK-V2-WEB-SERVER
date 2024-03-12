const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class AccountType extends Model {
		static associate(models) {
			this.hasMany(models.Payment, { foreignKey: "paymentMethod" });
		}
	}
	AccountType.init(
		{
			name: { type: DataTypes.STRING(100), unique: true },
		},
		{ sequelize, tableName: "accounttypes", modelName: "AccountType" }
	);
	return AccountType;
};
