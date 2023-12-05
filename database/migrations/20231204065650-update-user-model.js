"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		// Add a unique constraint to the email column
		await queryInterface.addConstraint("users", {
			type: "unique",
			fields: ["email"],
			name: "unique_email_constraint",
		});
	},

	down: async (queryInterface, Sequelize) => {
		// Remove the unique constraint from the email column
		await queryInterface.removeConstraint("users", "unique_email_constraint");
	},
};
