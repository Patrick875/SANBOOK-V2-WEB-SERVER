const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Service extends Model {
		static associate(models) {
			this.belongsTo(models.ServiceCategory, { foreignKey: "category" });
			this.hasMany(models.ServicePackage, { foreignKey: "service" });
			this.hasMany(models.ServiceSale, { foreignKey: "service" });
		}
	}
	Service.init(
		{
			name: DataTypes.STRING,
			headerImage: DataTypes.STRING,
			active: DataTypes.BOOLEAN,
			category: DataTypes.INTEGER,
			pricerwf: DataTypes.FLOAT,
			priceusd: { type: DataTypes.FLOAT, allowNull: true },
		},
		{ sequelize, modelName: "Service", tableName: "services" }
	);

	return Service;
};
