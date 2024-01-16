//jshint esversion:9
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class ItemQuantity extends Model {
		static associate(models) {
			this.belongsTo(models.Item, { foreignkey: "item" });
		}
	}
	ItemQuantity.init(
		{
			item: DataTypes.INTEGER,
			value: DataTypes.FLOAT,
			unit: DataTypes.STRING,
		},
		{ sequelize, tableName: "itemquantities", modelName: "ItemQuantity" }
	);
	return ItemQuantity;
};
