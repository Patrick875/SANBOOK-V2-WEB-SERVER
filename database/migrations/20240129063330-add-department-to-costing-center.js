"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("costingcenters", "linkeddepartment", {
			type: Sequelize.INTEGER,
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("costingcenters", "linkeddepartment");
	},
};
