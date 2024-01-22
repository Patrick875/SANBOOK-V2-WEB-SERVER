// controllerFactory.js
const getIncludeModels = (modelsToInclude) => {
	if (!modelsToInclude) {
		return [];
	}

	const includeModels = modelsToInclude.map((modelName) => {
		// Customize the attributes as needed
		return {
			model: modelName,
			attributes: { exclude: ["createdAt", "updatedAt"] },
		};
	});

	return includeModels;
};

const createController = (model, modelsToInclude) => {
	return {
		getAll: async (req, res) => {
			const { exclude } = req.query;

			const options = {
				include: getIncludeModels(modelsToInclude),
				attributes: exclude ? { exclude: exclude.split(",") } : undefined,
			};

			try {
				const data = await model.findAll(options);
				res.status(200).json(data);
			} catch (error) {
				console.error(error);
				res.status(500).json({ error: "Internal Server Error" });
			}
		},

		getOne: async (req, res, modelsToInclude) => {
			const { id } = req.params;
			try {
				const data = await model.findOne({
					where: { id },
					include: getIncludeModels(modelsToInclude),
				});
				if (!data) {
					res.status(404).json({ error: "Not Found" });
				} else {
					res.status(200).json(data);
				}
			} catch (error) {
				console.error(error);
				res.status(500).json({ error: "Internal Server Error" });
			}
		},

		create: async (req, res) => {
			const newData = req.body;
			try {
				const createdData = await model.create(newData);
				res.status(201).json(createdData);
			} catch (error) {
				console.error(error);
				res.status(500).json({ error: "Internal Server Error" });
			}
		},

		update: async (req, res) => {
			const { id } = req.params;
			const updatedData = req.body;
			try {
				const existingData = await model.findByPk(id);
				if (!existingData) {
					res.status(404).json({ error: "Not Found" });
				} else {
					await existingData.update(updatedData);
					res.status(200).json(existingData);
				}
			} catch (error) {
				console.error(error);
				res.status(500).json({ error: "Internal Server Error" });
			}
		},

		deleteOne: async (req, res) => {
			const { id } = req.params;
			try {
				const deletedRowCount = await model.destroy({ where: { id } });
				if (deletedRowCount === 0) {
					res.status(404).json({ error: "Not Found" });
				} else {
					res.status(204).end();
				}
			} catch (error) {
				console.error(error);
				res.status(500).json({ error: "Internal Server Error" });
			}
		},

		deleteAll: async (req, res) => {
			try {
				const deletedRowCount = await model.destroy({ where: {} });
				res.status(204).end();
			} catch (error) {
				console.error(error);
				res.status(500).json({ error: "Internal Server Error" });
			}
		},
	};
};

module.exports = createController;
