const { StockUnit, Equivalence } = require("./../../database/models");
const { asyncWrapper } = require("./../../utils/asyncWrapper");

exports.getAll = asyncWrapper(async (req, res) => {
	const units = await StockUnit.findAll();

	return res.status(200).json({
		status: "success",
		data: units,
	});
});

exports.create = asyncWrapper(async (req, res) => {
	const { name, equivalences } = req.body;
	if (!name) {
		return res.status(400).json({
			status: "Request failed",
			message: "name is required",
		});
	}

	const created = await StockUnit.create({
		name,
	});
	for (const equivalence of equivalences) {
		await Equivalence.create({
			unitAId: created.id,
			unitBId: equivalence.unit,
			value: equivalence.value,
		});
	}
	return res.status(201).json({
		status: "success",
		data: created,
	});
});

exports.addEquivalence = asyncWrapper(async (req, res) => {
	const { unitAId, unitBId, value } = req.body;
	const unitA = await StockUnit.findByPk(unitAId);
	const unitB = await StockUnit.findByPk(unitBId);

	if (!unitA || !unitB) {
		return res.status(404).json({ error: "One or more units not found" });
	}
	const equivalence = await Equivalence.create({
		unitAId,
		unitBId,
		value,
	});

	return res.status(201).json(equivalence);
});
