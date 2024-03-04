"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("roomtypes", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			icon: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			code: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			numberofchildren: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			numberofadults: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			smockingallowed: {
				type: Sequelize.BOOLEAN,
				allowNull: true,
			},
			active: {
				type: Sequelize.BOOLEAN,
				defaultValue: true,
			},
			bedtype: {
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
		await queryInterface.dropTable("roomtypes");
	},
};
