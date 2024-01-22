const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class ItemTransaction extends Model {
		static associate(models) {
			this.belongsTo(models.ItemCategory, { foreignKey: "category" });
			this.belongsTo(models.Store, { foreignKey: "store" });
			this.belongsTo(models.Item, { foreignKey: "item" });
		}
	}
	ItemTransaction.init(
		{
			item: DataTypes.INTEGER,
			quantity: DataTypes.FLOAT,
			price: DataTypes.FLOAT,
			preQuantity: DataTypes.FLOAT,
			newQuantity: DataTypes.FLOAT,
			date: DataTypes.STRING,
			balance: DataTypes.FLOAT,
			status: DataTypes.ENUM("ADDED", "RETURNED", "REMOVED"),
			store: DataTypes.INTEGER,
			category: DataTypes.INTEGER,
			to: DataTypes.INTEGER,
		},
		{ sequelize, tableName: "itemtransactions", modelName: "ItemTransaction" }
	);
	return ItemTransaction;
};
