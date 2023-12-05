//jshint esversion:9
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
process.env.ROOT_DIR = path.resolve(__dirname);

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
