const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class ServiceCategory extends Model {
		static associate(models) {
			this.hasMany(models.Service, { foreignKey: "category" });
		}
	}
	ServiceCategory.init(
		{
			name: { type: DataTypes.STRING, unique: true },
			headerImage: DataTypes.STRING,
			active: DataTypes.BOOLEAN,
		},
		{ sequelize, modelName: "ServiceCategory", tableName: "servicecategories" }
	);

	return ServiceCategory;
};
