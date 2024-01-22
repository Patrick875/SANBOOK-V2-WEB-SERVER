"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("stockPurchaseOrderDetails", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			ItemId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "Item", // Make sure to use the actual model name for your Item model
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			stockPurchaseOrderId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "StockPurchaseOrders", // Make sure to use the actual model name for your StockPurchaseOrder model
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			currentQuantity: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			requestQuantity: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			unitPrice: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			unit: {
				type: Sequelize.STRING,
				allowNull: false,
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
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("stockPurchaseOrderDetails");
	},
};
