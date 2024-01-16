"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		// Change the status column type to STRING
		await queryInterface.changeColumn("employeerequests", "type", {
			type: Sequelize.ENUM(
				"Leave",
				"Advance on Payment",
				"Appointment",
				"Other"
			),
			allowNull: true,
			// You can set a default value if needed
		});
	},

	down: async (queryInterface, Sequelize) => {
		// If you need to revert the changes, you can add the code here
		await queryInterface.changeColumn("employeerequests", "type", {
			type: Sequelize.ENUM(
				"Leave",
				"Advance on Payment",
				"Appointment",
				"Other"
			),
			allowNull: true,
		});
	},
};
