"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("rooms", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			roomType: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "RoomTypes",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			roomName: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			receptionStatus: {
				type: Sequelize.ENUM("reserved", "out of order", "occupied", "free"),
				allowNull: false,
				defaultValue: "free",
			},
			houseKeepingStatus: {
				type: Sequelize.ENUM("ready", "out of order", "in-cleaning"),
				allowNull: false,
				defaultValue: "ready",
			},
			location: {
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
		await queryInterface.dropTable("rooms");
	},
};
