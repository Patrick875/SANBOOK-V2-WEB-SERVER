const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class BaughtItem extends Model {
		static associate(models) {
			this.belongsTo(models.StockUnit, { foreignKey: "unit" });
			this.belongsTo(models.Item, { foreignKey: "item" });
		}
	}
	BaughtItem.init(
		{
			item: DataTypes.INTEGER,
			quantity: DataTypes.FLOAT,
			price: DataTypes.FLOAT,
			unit: DataTypes.INTEGER,
		},
		{ sequelize, tableName: "baughtitems", modelName: "BaughtItem" }
	);
	return BaughtItem;
};
