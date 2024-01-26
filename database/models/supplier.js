const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Supplier extends Model {
		static associate(models) {
			this.hasMany(models.SupplierItemsList, { foreignKey: "supplier" });
			this.hasMany(models.SupplierList, { foreignKey: "supplier" });
		}
	}
	Supplier.init(
		{
			name: { type: DataTypes.STRING(100), unique: true },
			tel: { type: DataTypes.STRING },
		},
		{ sequelize, tableName: "suppliers", modelName: "Supplier" }
	);
	return Supplier;
};
