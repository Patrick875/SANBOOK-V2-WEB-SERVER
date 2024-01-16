const express = require("express");
const router = express.Router();
const {
	create,
	update,
	getAll,
	getEmployeeRequests,
	deleteOne,
	deleteAll,
} = require("./../../controllers/HR/employeeRequestController");

router
	.route("/emrequests")
	.get(getAll)
	.post(create)
	.patch(update)
	.delete(deleteAll);
router.post("/emrequests/personal", getEmployeeRequests);
router.delete("/emrequests/deletereq", deleteOne);

module.exports = router;
