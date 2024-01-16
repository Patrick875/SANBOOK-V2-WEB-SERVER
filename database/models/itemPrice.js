//jshint esversion:9
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class ItemPrice extends Model {
		static associate(models) {
			this.belongsTo(models.Item, { foreignkey: "item" });
		}
	}
	ItemPrice.init(
		{
			item: DataTypes.INTEGER,
			value: DataTypes.FLOAT,
		},
		{ sequelize, tableName: "itemsprices", modelName: "ItemPrice" }
	);
	return ItemPrice;
};
