const employeeWarningsController = require("../../controllers/HR/employeeWarningsController");
const express = require("express");

const router = express.Router();

router.post("/warnings", employeeWarningsController.create);
router.get("/warnings/:emId", employeeWarningsController.getEmployeeWarnings);

module.exports = router;
