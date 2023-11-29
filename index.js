//jshint esversion:9
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const db = require("./database/models");
const app = require("./app");

const PORT = process.env.PORT || 5000;

db.dbConnection;

db.sequelize.sync({ force: false }).then(async () => {
	console.log("DB SYNCED SUCCESSFULY");
	app.listen(PORT, () => {
		console.log(`App service started on port ${PORT}`);
	});
});
