"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class StockPurchaseOrderDetail extends Model {
		static associate(models) {
			// define association here
			this.belongsTo(models.StockPurchaseOrder, {
				foreignKey: "stockPurchaseOrderId",
			});
			this.belongsTo(models.Item, { foreignKey: "ItemId" });
		}
	}
	StockPurchaseOrderDetail.init(
		{
			ItemId: DataTypes.INTEGER,
			stockPurchaseOrderId: DataTypes.INTEGER,
			currentQuantity: DataTypes.INTEGER,
			requestQuantity: DataTypes.INTEGER,
			unitPrice: DataTypes.INTEGER,
			unit: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "StockPurchaseOrderDetail",
			tableName: "stockPurchaseOrderDetails",
		}
	);
	return StockPurchaseOrderDetail;
};
