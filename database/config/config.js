require("dotenv").config();
module.exports = {
	development: {
		url: process.env.DB_URL,
		dialect: "postgres",
		user: "postgres",
		password: "12345",
	},
};
