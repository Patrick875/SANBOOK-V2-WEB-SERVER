"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("users", "status", {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: true, // Set a default value if needed
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("users", "status");
	},
};
