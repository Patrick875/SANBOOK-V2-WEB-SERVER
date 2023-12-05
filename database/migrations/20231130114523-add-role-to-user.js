"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		queryInterface.addColumn("users", "role", {
			type: Sequelize.ENUM("user", "role"),
		});
	},

	down: async (queryInterface, Sequelize) => {
		queryInterface.removeColum("users", role);
	},
};
