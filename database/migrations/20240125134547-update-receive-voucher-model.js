"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("receivevouchers", "supplierList", {
			type: Sequelize.INTEGER,
		});

		await queryInterface.addColumn("receivevouchers", "suppliedBy", {
			type: Sequelize.STRING,
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("receivevouchers", "supplierList");
		await queryInterface.removeColumn("receivevouchers", "suppliedBy");
	},
};
