"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("bookings", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			refId: {
				type: Sequelize.UUID,
				allowNull: false,
			},
			guest: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			room: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			numberOfAdults: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			numberOfChildren: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			checkinDate: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			checkoutDate: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			commingFrom: {
				type: Sequelize.STRING,
			},
			goingTo: {
				type: Sequelize.STRING,
			},
			datesIn: {
				type: Sequelize.ARRAY(Sequelize.DATE),
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
		await queryInterface.dropTable("bookings");
	},
};
