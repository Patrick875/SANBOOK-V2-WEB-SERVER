const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Equivalence extends Model {
		static associate(models) {}
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
			table: "equivalences",
		}
	);

	return Equivalence;
};
