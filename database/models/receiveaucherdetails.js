"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class ReceiveVoucherDetail extends Model {
		static associate(models) {
			this.belongsTo(models.ReceiveVoucher, {
				foreignKey: "receiveVoucherId",
				onDelete: "CASCADE",
			});
			this.belongsTo(models.Item, { foreignKey: "item" });
		}
	}

	ReceiveVoucherDetail.init(
		{
			item: DataTypes.INTEGER,
			receiveVoucherId: DataTypes.INTEGER,
			receivedQuantity: DataTypes.INTEGER,
			unitPrice: DataTypes.FLOAT,
		},
		{
			sequelize,
			modelName: "ReceiveVoucherDetail",
			tableName: "receivevoucherdetails",
		}
	);
	return ReceiveVoucherDetail;
};
