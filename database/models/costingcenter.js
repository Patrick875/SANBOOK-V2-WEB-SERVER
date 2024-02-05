const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class CostingCenter extends Model {
		static associate(models) {
			this.hasMany(models.CostingCenterItem, { foreignKey: "costingcenter" });
			this.belongsTo(models.Department, { foreignKey: "department" });
		}
	}
	CostingCenter.init(
		{
			name: { type: DataTypes.STRING(100), unique: true },
			department: DataTypes.INTEGER,
			status: {
				type: DataTypes.ENUM("ACTIVE" || "CLOSED"),
				defaultValue: "ACTIVE",
			},
		},
		{ sequelize, tableName: "costingcenters", modelName: "CostingCenter" }
	);
	return CostingCenter;
};
