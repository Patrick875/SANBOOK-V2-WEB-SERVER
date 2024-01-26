const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class SupplierList extends Model {
		static associate(models) {
			this.belongsTo(models.Supplier, { foreignKey: "supplier" });
			this.hasMany(models.SupplierListItem, { foreignKey: "supplierlist" });
		}
	}
	SupplierList.init(
		{
			supplier: { type: DataTypes.INTEGER },
			date: DataTypes.STRING,
			total: DataTypes.FLOAT,
		},
		{ sequelize, tableName: "supplierlists", modelName: "SupplierList" }
	);
	return SupplierList;
};
