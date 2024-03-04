"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.renameColumn("rooms", "roomName", "name");

		await queryInterface.renameColumn("rooms", "roomType", "type");
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.renameColumn("rooms", "name", "roomName");

		await queryInterface.renameColumn("rooms", "type", "roomType");
	},
};
