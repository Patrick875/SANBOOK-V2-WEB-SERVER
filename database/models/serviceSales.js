const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class ServiceSale extends Model {
		static associate(models) {
			this.hasMany(models.ServiceSaleDetail, { foreignKey: "serviceSale" });
			this.hasMany(models.Payment, { foreignKey: "servicesale" });
			this.hasMany(models.Debt, { foreignKey: "service" });
		}
	}
	ServiceSale.init(
		{
			clientname: DataTypes.STRING,
			amount_paid: DataTypes.FLOAT,
			total_due: DataTypes.FLOAT,
			datefor: DataTypes.DATE,
		},
		{ sequelize, modelName: "ServiceSale", tableName: "servicesales" }
	);

	return ServiceSale;
};
