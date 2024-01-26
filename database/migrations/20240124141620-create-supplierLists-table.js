"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("supplierlists", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			supplier: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "suppliers", // Assuming the Supplier model is in a file named 'supplier.js'
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			date: {
				type: Sequelize.STRING,
				allowNull: true,
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
		await queryInterface.dropTable("supplierlists");
	},
};
