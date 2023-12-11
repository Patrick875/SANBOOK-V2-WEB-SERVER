"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.hasMany(models.User, { foreignKey: "createdby" });
			this.belongsTo(models.Employee, { foreignKey: "employeeId" });
		}
	}
	User.init(
		{
			username: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			resetPassword: DataTypes.STRING,
			employeeId: DataTypes.INTEGER,
			status: DataTypes.BOOLEAN,
			role: { type: DataTypes.ENUM("user", "admin"), allowNull: true },
		},
		{
			sequelize,
			modelName: "User",
			tableName: "users",
		}
	);
	return User;
};
