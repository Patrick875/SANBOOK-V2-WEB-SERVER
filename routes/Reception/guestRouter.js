const guestController = require("../../controllers/Reception/Guests/guestController");
const express = require("express");

const router = express.Router();

router.get("/guests", guestController.getAll);

module.exports = router;
