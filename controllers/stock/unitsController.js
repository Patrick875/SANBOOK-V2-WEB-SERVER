const { StockUnit, Equivalence } = require("./../../database/models");

exports.getAll = async (req, res) => {
	try {
		const units = await StockUnit.findAll();

		return res.status(200).json({
			status: "success",
			data: units,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			status: "request failed",
			message: "server error",
		});
	}
};

exports.create = async (req, res) => {
	const { name } = req.body;
	if (!name) {
		return res.status(400).json({
			status: "Request failed",
			message: "name is required",
		});
	}
	try {
		const { name } = req.body;
		const created = await StockUnit.create({
			name,
		});
		return res.status(201).json({
			status: "success",
			data: created,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			status: "Request Failed",
			message: "sever error",
		});
	}
};
exports.addEquivalence = async (req, res) => {
	try {
		const { unitAId, unitBId, value } = req.body;
		// Check if both units exist
		const unitA = await StockUnit.findByPk(unitAId);
		const unitB = await StockUnit.findByPk(unitBId);

		if (!unitA || !unitB) {
			return res.status(404).json({ error: "One or more units not found" });
		}
		// Create equivalence
		const equivalence = await Equivalence.create({
			unitAId,
			unitBId,
			value,
		});

		return res.status(201).json(equivalence);
	} catch (error) {
		console.error("Error adding equivalence:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
};
exports.createUnitAndEquivalence = async (req, res) => {
	try {
		const { name, otherUnit, otherUnitName, value } = req.body;

		// Create or find the main unit
		let unitA;
		if (otherUnit) {
			unitA = await Unit.findByPk(otherUnit);
		} else if (otherUnitName) {
			unitA = await Unit.create({ name: otherUnitName });
		} else {
			return res
				.status(400)
				.json({ error: "Either otherUnit or otherUnitName is required" });
		}

		// Create the new unit
		const unitB = await Unit.create({ name });

		// Establish equivalence
		const equivalence = await Equivalence.create({
			unitAId: unitA.id,
			unitBId: unitB.id,
			value,
		});

		return res.status(201).json(equivalence);
	} catch (error) {
		console.error("Error creating unit and equivalence:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
};
