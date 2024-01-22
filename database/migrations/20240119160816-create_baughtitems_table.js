// In the generated migration file (timestamp-create_baughtitems_table.js), add the following content:

"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("baughtitems", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			item: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			quantity: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			price: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			unit: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "stockunits",
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
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("baughtitems");
	},
};
