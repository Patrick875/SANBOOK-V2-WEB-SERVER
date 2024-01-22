"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class StockPurchaseOrder extends Model {
		static associate(models) {
			// define association here
			this.hasMany(models.StockPurchaseOrderDetail, {
				foreignKey: "stockPurchaseOrderId",
				onDelete: "CASCADE",
			});
			this.belongsTo(models.User, { foreignKey: "userId" });
		}
	}
	StockPurchaseOrder.init(
		{
			date: DataTypes.DATE,
			status: {
				type: DataTypes.STRING,
				defaultValue: "PENDING",
			},
			firstapproval: DataTypes.BOOLEAN,
			secondapproval: DataTypes.BOOLEAN,
			thirdapproval: DataTypes.BOOLEAN,
			userId: DataTypes.INTEGER,
			total: DataTypes.INTEGER,
			purchaseOrderId: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "StockPurchaseOrder",
			tableName: "stockPurchaseOrders",
		}
	);
	return StockPurchaseOrder;
};
