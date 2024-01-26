"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("supplierlistitems", "unitPrice", {
			type: Sequelize.FLOAT,
		});

		await queryInterface.addColumn("supplierlistitems", "quantity", {
			type: Sequelize.FLOAT,
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("supplierlistitems", "unitPrice");
		await queryInterface.removeColumn("supplierlistitems", "quantity");
	},
};
