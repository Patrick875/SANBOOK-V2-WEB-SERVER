"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("employeecontracts", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			employee: {
				type: Sequelize.INTEGER,
			},
			contractid: {
				type: Sequelize.STRING(12),
			},
			workingshiftstarts: {
				type: Sequelize.STRING,
			},
			workingshiftends: {
				type: Sequelize.STRING,
			},
			annualleave: {
				type: Sequelize.INTEGER,
			},
			annualleaveafter: {
				type: Sequelize.INTEGER,
			},
			contractclauses: {
				type: Sequelize.ARRAY(Sequelize.STRING),
			},
			dateofsigning: {
				type: Sequelize.STRING,
			},
			effectsfrom: {
				type: Sequelize.STRING,
			},
			effectstill: {
				type: Sequelize.STRING,
			},
			active: {
				type: Sequelize.BOOLEAN,
			},
			createdby: {
				type: Sequelize.INTEGER,
			},
			pdfLink: {
				type: Sequelize.STRING,
				allowNull: true,
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
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("employeecontracts");
	},
};
