"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("receivevouchers", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			date: {
				type: Sequelize.DATE,
			},
			status: {
				type: Sequelize.STRING,
			},
			total: {
				type: Sequelize.FLOAT,
			},
			receiveVoucherId: {
				type: Sequelize.STRING,
			},
			stockPurchaseOrderId: {
				type: Sequelize.INTEGER,
				references: {
					model: "StockPurchaseOrder",
					key: "id",
				},
				onUpdate: "cascade",
				onDelete: "cascade",
			},
			approvals: {
				type: Sequelize.ARRAY(Sequelize.STRING),
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});

		await queryInterface.addConstraint("receivevouchers", {
			fields: ["stockPurchaseOrderId"],
			type: "foreign key",
			name: "fk_receivevouchers_stockPurchaseOrderId",
			references: {
				table: "stockPurchaseOrders",
				field: "id",
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("receivevouchers");
	},
};
