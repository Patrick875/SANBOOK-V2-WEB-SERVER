const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Equivalence extends Model {
		static associate(models) {
			// this.belongsTo(models.StockUnit, {
			// 	as: "equivalences", // Use the same alias as in StockUnit model
			// 	foreignKey: "unitAId",
			// });
			// this.belongsTo(models.StockUnit, {
			// 	as: "equivalences", // Use the same alias as in StockUnit model
			// 	foreignKey: "unitBId",
			// });
		}
	}
	Equivalence.init(
		{
			value: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			unitAId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			unitBId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Equivalence",
			table: "unitequivalences",
		}
	);

	return Equivalence;
};
