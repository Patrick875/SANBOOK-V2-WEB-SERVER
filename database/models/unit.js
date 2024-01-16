const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class StockUnit extends Model {
		static associate(models) {
			this.hasMany(models.Item, { foreignKey: "mainunit" });
		}
	}

	StockUnit.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "StockUnit",
			tableName: "units",
		}
	);
	return StockUnit;
};
