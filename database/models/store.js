const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Store extends Model {
		static associate(models) {
			this.hasMany(models.ItemCategory, { foreignKey: "store" });
			this.hasMany(models.Item, { foreignKey: "store" });
		}
	}
	Store.init(
		{
			name: { type: DataTypes.STRING(100), unique: true },
			active: { type: DataTypes.BOOLEAN, defaultValue: true },
			selling: DataTypes.BOOLEAN,
			createdBy: DataTypes.INTEGER,
		},
		{ sequelize, tableName: "stores", modelName: "Store" }
	);
	return Store;
};
