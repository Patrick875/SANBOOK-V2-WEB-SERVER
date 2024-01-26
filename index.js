//jshint esversion:9
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const cloudinary = require("cloudinary").v2;

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
});

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
