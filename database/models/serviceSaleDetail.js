const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class ServiceSaleDetail extends Model {
		static associate(models) {
			this.belongsTo(models.Service, { foreignKey: "service" });
			this.belongsTo(models.ServiceSale, { foreignKey: "serviceSale" });
			this.belongsTo(models.ServicePackage, { foreignKey: "service_package" });
		}
	}
	ServiceSaleDetail.init(
		{
			service: DataTypes.INTEGER,
			service_package: DataTypes.INTEGER,
			quantity: DataTypes.INTEGER,
			serviceSale: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "ServiceSaleDetail",
			tableName: "servicesaledetails",
		}
	);

	return ServiceSaleDetail;
};
