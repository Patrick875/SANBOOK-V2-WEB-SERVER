"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class ReceiveVoucher extends Model {
		static associate(models) {
			// define association here
			this.belongsTo(models.StockPurchaseOrder, {
				foreignKey: "stockPurchaseOrderId",
			});
			// this.belongsTo(models.User, { foreignKey: "userId" });
			this.hasMany(models.ReceiveVoucherDetail, {
				foreignKey: "receiveVoucherId",
				onDelete: "CASCADE",
			});
		}
	}
	ReceiveVoucher.init(
		{
			date: DataTypes.DATE,
			status: DataTypes.STRING,
			total: DataTypes.FLOAT,
			receiveVoucherId: DataTypes.STRING,
			stockPurchaseOrderId: DataTypes.INTEGER,
			approvals: DataTypes.ARRAY(DataTypes.STRING),
		},
		{
			sequelize,
			modelName: "ReceiveVoucher",
			tableName: "receivevouchers",
		}
	);
	return ReceiveVoucher;
};
