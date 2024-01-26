const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class SupplierItem extends Model {
		static associate(models) {
			this.belongsTo(models.SupplierItemsList, { foreignKey: "list" });
			this.belongsTo(models.Item, { foreignKey: "item" });
		}
	}
	SupplierItem.init(
		{
			list: { type: DataTypes.INTEGER },
			item: DataTypes.INTEGER,
		},
		{ sequelize, tableName: "supplieritems", modelName: "SupplierItem" }
	);
	return SupplierItem;
};
