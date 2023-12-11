"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("salaryadvantages", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			percentage: {
				type: Sequelize.DECIMAL,
				allowNull: true,
			},
			amount: {
				type: Sequelize.DECIMAL,
				allowNull: true,
			},
			active: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
			},
			createdBy: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "users",
					key: "id",
				},
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

		// Add foreign key constraint for createdBy
		await queryInterface.addConstraint("salaryadvantages", {
			fields: ["createdBy"],
			type: "foreign key",
			name: "fk_salaryadvantages_createdBy",
			references: {
				table: "users",
				field: "id",
			},
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("salaryadvantages");
	},
};
