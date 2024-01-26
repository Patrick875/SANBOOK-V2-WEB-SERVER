"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("supplierlistitems", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			supplierlist: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "supplierlists", // Assuming the SupplierList model is in a file named 'supplierlist.js'
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			item: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "items", // Assuming the Item model is in a file named 'item.js'
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
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
		await queryInterface.dropTable("supplierlistitems");
	},
};
