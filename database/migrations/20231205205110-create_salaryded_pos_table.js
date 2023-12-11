"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("salaryded_pos", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			salaryDeductionId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "salarydeductions",
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

		// Add a composite primary key
		await queryInterface.addConstraint("salaryded_pos", {
			fields: ["salaryDeductionId", "positionId"],
			type: "unique",
			name: "pk_salaryded_pos",
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("salaryded_pos");
	},
};
