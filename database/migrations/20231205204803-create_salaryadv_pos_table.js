"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("salaryadv_pos", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			salaryAdvantageId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "salaryadvantages",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			positionId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "positions",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
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

		// Add unique constraint to ensure a combination of salaryAdvantageId and positionId is unique
		await queryInterface.addConstraint("salaryadv_pos", {
			fields: ["salaryAdvantageId", "positionId"],
			type: "unique",
			name: "uk_salaryadv_pos_salaryAdvantageId_positionId",
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("salaryadv_pos");
	},
};
