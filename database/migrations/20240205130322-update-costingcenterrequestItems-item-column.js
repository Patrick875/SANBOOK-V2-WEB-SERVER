"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.renameColumn(
			"costingcenterrequestitems",
			"item",
			"baughtitem"
		);
	},

	down: async (queryInterface, Sequelize) => {
		// If you ever need to revert the change, you can implement the down migration here
		await queryInterface.renameColumn(
			"costingcenterrequestitems",
			"baughtitem",
			"item"
		);
	},
};
