"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("costingcenteritems", "state", {
			type: Sequelize.DataTypes.ENUM("used", "in-stock"),
			defaultValue: "in-stock",
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("costingcenteritems", "state");
	},
};
