const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class SupplierListItem extends Model {
		static associate(models) {
			this.belongsTo(models.SupplierList, { foreignKey: "supplierlist" });
			this.belongsTo(models.Item, { foreignKey: "item" });
		}
	}
	SupplierListItem.init(
		{
			supplierlist: { type: DataTypes.INTEGER },
			item: DataTypes.INTEGER,
			unitPrice: DataTypes.FLOAT,
			quantity: DataTypes.FLOAT,
		},
		{ sequelize, tableName: "supplierlistitems", modelName: "SupplierListItem" }
	);
	return SupplierListItem;
};
