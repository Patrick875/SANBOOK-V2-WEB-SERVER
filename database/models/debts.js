const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Debt extends Model {
		static associate(models) {
			this.belongsTo(models.ServiceSale, { foreignKey: "service" });
		}
	}
	Debt.init(
		{
			clientName: DataTypes.STRING,
			value: DataTypes.FLOAT,
			clientContact: DataTypes.JSONB,
			service: DataTypes.INTEGER,
			dateRegistered: DataTypes.DATE,
		},
		{ sequelize, tableName: "debts", modelName: "Debt" }
	);
	return Debt;
};
