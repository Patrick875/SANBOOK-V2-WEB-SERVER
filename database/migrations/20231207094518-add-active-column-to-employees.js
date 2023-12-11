"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("employees", "status", {
			type: Sequelize.ENUM("active", "on leave", "suspended"),
			allowNull: false,
			defaultValue: "active", // Set a default value if needed
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("employees", "status");
	},
};
