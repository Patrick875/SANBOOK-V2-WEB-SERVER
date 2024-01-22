"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("receivevoucherdetails", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			item: {
				type: Sequelize.INTEGER,
				references: {
					model: "Item",
					key: "id",
				},
				onUpdate: "cascade",
				onDelete: "cascade",
			},
			receiveVoucherId: {
				type: Sequelize.INTEGER,
				references: {
					model: "ReceiveVoucher",
					key: "id",
				},
				onDelete: "cascade",
			},
			receivedQuantity: {
				type: Sequelize.INTEGER,
			},
			unitPrice: {
				type: Sequelize.FLOAT,
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
		await queryInterface.dropTable("receivevoucherdetails");
	},
};
