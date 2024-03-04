"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.renameTable("Equivalences", "equivalences");
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.renameTable("equivalences", "Equivalences");
	},
};
