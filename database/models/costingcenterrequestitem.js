const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class CostingCenterRequestItem extends Model {
		static associate(models) {
			this.belongsTo(models.CostingCenterRequest, { foreignKey: "request" });
			this.belongsTo(models.BaughtItem, { foreignKey: "item" });
		}
	}
	CostingCenterRequestItem.init(
		{
			request: DataTypes.INTEGER,
			item: DataTypes.INTEGER,
			quantity: DataTypes.FLOAT,
			unit: DataTypes.INTEGER,
			price: DataTypes.FLOAT,
		},
		{
			sequelize,
			tableName: "costingcenterrequestitems",
			modelName: "CostingCenterRequestItem",
		}
	);
	return CostingCenterRequestItem;
};
