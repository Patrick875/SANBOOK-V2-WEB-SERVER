exports.generateId = async (prefix, sequelizeModel) => {
	// Count the number of items in the related table
	const itemCount = await sequelizeModel.count();
	const paddedId = String(itemCount + 1).padStart(3, "0");
	// Combine prefix and padded ID
	const generatedId = `${prefix}_${paddedId}`;

	return generatedId;
};
