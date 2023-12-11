"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("positions", {
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
			posid: {
				type: Sequelize.STRING(12),
				allowNull: false,
			},
			department: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "departments",
					key: "id",
				},
			},
			duties: {
				type: Sequelize.ARRAY(Sequelize.STRING),
			},
			netSallary: {
				type: Sequelize.DECIMAL,
			},
			grossSalary: {
				type: Sequelize.DECIMAL,
			},
			reportsTo: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: "positions",
					key: "id",
				},
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

		// Add foreign key constraints for SalaryAdvPos and SalaryDedPos if those tables exist
		await queryInterface.addConstraint("positions", {
			fields: ["department"],
			type: "foreign key",
			name: "fk_positions_department",
			references: {
				table: "departments",
				field: "id",
			},
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
		});

		await queryInterface.addConstraint("positions", {
			fields: ["reportsTo"],
			type: "foreign key",
			name: "fk_positions_reportsTo",
			references: {
				table: "positions",
				field: "id",
			},
			onDelete: "SET NULL",
			onUpdate: "CASCADE",
		});

		await queryInterface.addConstraint("positions", {
			fields: ["createdBy"],
			type: "foreign key",
			name: "fk_positions_createdBy",
			references: {
				table: "users",
				field: "id",
			},
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("positions");
	},
};
