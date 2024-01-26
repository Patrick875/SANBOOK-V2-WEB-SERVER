const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class SupplierItemsList extends Model {
		static associate(models) {
			this.belongsTo(models.Supplier, { foreignKey: "supplier" });
			this.hasMany(models.SupplierItem, { foreignKey: "list" });
		}
	}
	SupplierItemsList.init(
		{
			supplier: { type: DataTypes.INTEGER },
		},
		{
			sequelize,
			tableName: "supplieritemslist",
			modelName: "SupplierItemsList",
		}
	);
	return SupplierItemsList;
};
