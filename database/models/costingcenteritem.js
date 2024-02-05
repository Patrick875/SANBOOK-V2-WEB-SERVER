const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class CostingCenterItem extends Model {
		static associate(models) {
			this.belongsTo(models.CostingCenter, { foreignKey: "costingcenter" });
			this.belongsTo(models.BaughtItem, { foreignKey: "baughtitem" });
		}
	}
	CostingCenterItem.init(
		{
			baughtitem: DataTypes.INTEGER,
			quantity: DataTypes.FLOAT,
			price: DataTypes.FLOAT,
			unit: DataTypes.INTEGER,
			state: {
				type: DataTypes.ENUM("used", "in-stock"),
				defaultValue: "in-stock",
			},
			costingcenter: DataTypes.INTEGER,
		},
		{
			sequelize,
			tableName: "costingcenteritems",
			modelName: "CostingCenterItem",
		}
	);
	return CostingCenterItem;
};
