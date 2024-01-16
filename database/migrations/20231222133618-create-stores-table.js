"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("stores", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
			active: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			selling: {
				type: Sequelize.BOOLEAN,
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
		await queryInterface.dropTable("stores");
	},
};
