const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class ServicePackage extends Model {
		static associate(models) {
			this.belongsTo(models.Service, { foreignKey: "service" });
			this.hasMany(models.ServiceSale, { foreignKey: "service_package" });
		}
	}
	ServicePackage.init(
		{
			name: DataTypes.STRING,
			service: DataTypes.INTEGER,
			active: DataTypes.BOOLEAN,
			pricerwf: DataTypes.FLOAT,
			priceusd: DataTypes.FLOAT,
		},
		{ sequelize, modelName: "ServicePackage", tableName: "servicepackages" }
	);

	return ServicePackage;
};
