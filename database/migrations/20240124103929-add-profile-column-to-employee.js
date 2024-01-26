"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("employees", "profile", {
			type: Sequelize.STRING,
			allowNull: true, // You can set it to false if profile is required
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("employees", "profile");
	},
};
