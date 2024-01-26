"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("supplierlists", "total", {
			type: Sequelize.FLOAT,
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("supplierlists", "total");
	},
};
