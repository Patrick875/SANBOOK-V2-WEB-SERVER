const { UniqueConstraintError, ValidationError } = require("sequelize");

// Error handler middleware function
const errorHandler = (err, req, res, next) => {
	if (err instanceof UniqueConstraintError) {
		// Handling duplicate entry error
		return res
			.status(400)
			.json({ error: "Duplicate entry", message: err.message });
	} else if (err instanceof ValidationError) {
		// Handling validation error
		const errors = err.errors.map((error) => ({
			field: error.path,
			message: error.message,
		}));
		return res.status(400).json({ error: "Validation error", errors });
	}

	// For other errors, delegate to the default Express error handler
	next(err);
};

module.exports = errorHandler;
