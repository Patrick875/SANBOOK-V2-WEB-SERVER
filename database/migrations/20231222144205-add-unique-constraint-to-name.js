"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addConstraint("stores", {
			fields: ["name"],
			type: "unique",
			name: "unique_store_name_constraint",
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeConstraint(
			"stores",
			"unique_store_name_constraint"
		);
	},
};
