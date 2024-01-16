const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class ItemCategory extends Model {
		static associate(models) {
			this.belongsTo(models.Store, { foreignKey: "store" });
			this.hasMany(models.Item, { foreignKey: "category" });
		}
	}
	ItemCategory.init(
		{
			name: { type: DataTypes.STRING(100), unique: true },
			store: DataTypes.INTEGER,
			createdBy: DataTypes.INTEGER,
		},
		{ sequelize, tableName: "itemcategories", modelName: "ItemCategory" }
	);
	return ItemCategory;
};
