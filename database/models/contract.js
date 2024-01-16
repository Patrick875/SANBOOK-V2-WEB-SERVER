const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class EmployeeContract extends Model {
		static associate(models) {
			this.belongsTo(models.Employee, { foreignKey: "employee" });
		}
	}
	EmployeeContract.init(
		{
			employee: DataTypes.INTEGER,
			contractid: DataTypes.STRING(12),
			workingshiftstarts: DataTypes.STRING,
			workingshiftends: DataTypes.STRING,
			annualleave: DataTypes.INTEGER,
			annualleaveafter: DataTypes.STRING,
			contractclauses: DataTypes.ARRAY(DataTypes.STRING),
			dateofsigning: DataTypes.STRING,
			effectsfrom: DataTypes.STRING,
			effectstill: DataTypes.STRING,
			active: DataTypes.BOOLEAN,
			createdby: DataTypes.INTEGER,
			pdfLink: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{ sequelize, tableName: "employeecontracts", modelName: "EmployeeContract" }
	);
	return EmployeeContract;
};
