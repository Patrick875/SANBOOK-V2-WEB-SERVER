const express = require("express");
const contractController = require("./../../controllers/HR/contractController");

const router = express.Router();

router
	.route("/contracts")
	.get(contractController.getAll)
	.post(contractController.create)
	.patch(contractController.update);
router.get("/contracts/contract", contractController.getOne);

module.exports = router;
