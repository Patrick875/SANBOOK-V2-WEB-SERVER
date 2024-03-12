const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Payment extends Model {
		static associate(models) {
			this.belongsTo(models.AccountType, { foreignKey: "paymentMethod" });
			this.belongsTo(models.ServiceSale, { foreignKey: "servicesale" });
		}
	}
	Payment.init(
		{
			service: DataTypes.INTEGER,
			paymentMethod: DataTypes.INTEGER,
			value: DataTypes.FLOAT,
			date: DataTypes.DATE,
		},
		{ sequelize, tableName: "payments", modelName: "Payment" }
	);
	return Payment;
};
