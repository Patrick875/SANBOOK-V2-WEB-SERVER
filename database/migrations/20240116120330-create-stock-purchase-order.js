"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("stockPurchaseOrders", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			date: {
				type: Sequelize.DATE,
				allowNull: true, // Adjust this based on your requirement
			},
			status: {
				type: Sequelize.STRING,
				defaultValue: "PENDING",
				allowNull: false,
			},
			firstapproval: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
			},
			secondapproval: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
			},
			thirdapproval: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
			},
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "Users", // Make sure to use the actual model name for your User model
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			total: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			purchaseOrderId: {
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
		await queryInterface.dropTable("stockPurchaseOrders");
	},
};
