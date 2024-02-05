"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("supplierlists", "supplierListId", {
			type: Sequelize.STRING,
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("supplierlists", "supplierListId");
	},
};
