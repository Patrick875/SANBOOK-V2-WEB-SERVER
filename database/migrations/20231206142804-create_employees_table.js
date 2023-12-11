"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("employees", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			fullname: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			birthdate: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			gender: {
				type: Sequelize.ENUM("male", "female", "not stated"),
				allowNull: false,
			},
			maritalstatus: {
				type: Sequelize.ENUM("single", "married"),
				allowNull: false,
			},
			identification: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			nationality: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			residence_province: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			residence_district: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			telephone: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			whatsapphone: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			otherphone: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			emergencyphone: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			emergencyrelation: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			department: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "departments",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			position: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "positions",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			employmenttype: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: "full-time",
			},
			createdby: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "users",
					key: "id",
				},
				onUpdate: "CASCADE",
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
		await queryInterface.dropTable("employees");
	},
};
