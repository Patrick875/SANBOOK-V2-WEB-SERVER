"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("departments", "role", {
			type: Sequelize.DataTypes.STRING,
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("departments", "role");
	},
};
