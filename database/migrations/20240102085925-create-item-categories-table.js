"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("itemcategories", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING(100),
				unique: true,
				allowNull: false,
			},
			store: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			createdBy: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn("NOW"),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn("NOW"),
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("itemcategories");
	},
};
