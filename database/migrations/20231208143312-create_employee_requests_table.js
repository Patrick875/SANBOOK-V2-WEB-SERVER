"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("employeerequests", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			employeeId: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			description: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			status: {
				type: Sequelize.ENUM("submitted", "approved", "denied"),
				allowNull: false,
			},
			submittedon: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			updatedon: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			createdBy: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
		await queryInterface.addConstraint("employeerequests", {
			type: "foreign key",
			fields: ["employeeId"],
			name: "fk_employee_requests_employeeId",
			references: {
				table: "employees", // Assuming your Employee model is named "Employee"
				field: "id",
			},
			onDelete: "CASCADE",
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeConstraint(
			"employeerequests",
			"fk_employee_requests_employeeId"
		);
		await queryInterface.dropTable("employeerequests");
	},
};
