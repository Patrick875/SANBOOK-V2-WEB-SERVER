const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class CostingCenterRequest extends Model {
		static associate(models) {
			this.belongsTo(models.CostingCenter, { foreignKey: "costingcenter" });
			this.hasMany(models.CostingCenterRequestItem, { foreignKey: "request" });
		}
	}
	CostingCenterRequest.init(
		{
			costingcenter: DataTypes.INTEGER,
			date: DataTypes.DATE,
			status: {
				type: DataTypes.ENUM("PENDING", "APPROVED", "CANCELED"),
				defaultValue: "PENDING",
			},
		},
		{
			sequelize,
			tableName: "costingcenterrequests",
			modelName: "CostingCenterRequest",
		}
	);
	return CostingCenterRequest;
};
