const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Item extends Model {
		static associate(models) {
			this.belongsTo(models.Store, { foreignKey: "store" });
			this.belongsTo(models.ItemCategory, { foreignKey: "category" });
			this.belongsTo(models.StockUnit, { foreignKey: "mainunit" });
			this.hasMany(models.ItemQuantity, { foreignKey: "item" });
			this.hasMany(models.ItemPrice, { foreignKey: "item" });
		}
	}
	Item.init(
		{
			name: { type: DataTypes.STRING(100), unique: true },
			category: DataTypes.INTEGER,
			store: DataTypes.INTEGER,
			mainunit: DataTypes.INTEGER,
			price: DataTypes.FLOAT,

			createdBy: DataTypes.INTEGER,
		},
		{ sequelize, tableName: "items", modelName: "Item" }
	);
	return Item;
};
