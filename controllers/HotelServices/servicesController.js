const { Op } = require("sequelize");
const {
	Service,
	ServiceSale,
	ServiceSaleDetail,
	ServiceCategory,
	ServicePackage,
	Payment,
	AccountType,
	Debt,
} = require("../../database/models");

const { asyncWrapper } = require("../../utils/asyncWrapper");
const createController = require("../controllerFactory");

exports.getAll = asyncWrapper(async (req, res) => {
	const services = await Service.findAll({
		include: [{ model: ServiceCategory }],
	});

	return res.status(200).json({
		status: "success",
		data: services,
	});
});

exports.create = asyncWrapper(async (req, res) => {
	const { name, headerImage, category, pricerwf, priceusd, packages } =
		req.body;
	if (!name || !category) {
		return res.status(400).json({
			status: "bad request",
			message: "service name and category are required",
		});
	}

	const service = await Service.create({
		name,
		active: true,
		headerImage,
		category,
		pricerwf,
		priceusd,
	});

	if (packages && packages.length !== 0) {
		for (const pack of packages) {
			if (service.name !== "" && (service.pricerwf || service.priceusd)) {
				await ServicePackage.create({
					name: pack.name,
					pricerwf: pack.pricerwf,
					priceusd: pack.priceusd,
					service: service.id,
				});
			} else {
				return res.status(201).json({
					status: "success",
					data: service,
				});
			}
		}
	}

	return res.status(201).json({
		status: "success",
		data: service,
	});
});

exports.sellService = asyncWrapper(async (req, res) => {
	const {
		services,
		total_paid,
		paymentDetails,
		clientname,
		clientTel,
		clientEmail,
		clientIdentification,
		datefor,
		totalDue,
	} = req.body;

	if (!services || services.length === 0) {
		return res.status(404).json({
			status: "Request failed",
			message: "please provide services",
		});
	}

	const sale = await ServiceSale.create({
		amount_paid: total_paid,
		total_due: totalDue,
		clientname,
		datefor: datefor
			? new Date(datefor).toUTCString()
			: new Date().toUTCString(),
	});

	for (const item of services) {
		let servicePackage;
		if (item.packageId) {
			servicePackage = await ServicePackage.findOne({
				where: { id: item.packageId },
			});
		}

		const service = await Service.findOne({ where: { id: item.id } });
		if (!service) {
			return res.status(404).json({
				status: "Request failed",
				message: "service  not found",
			});
		}
		if (item.packageId && !servicePackage) {
			return res.status(404).json({
				status: "Request failed",
				message: "service package not found",
			});
		}

		await ServiceSaleDetail.create({
			quantity: item.quantity,
			service: item.id,
			service_package: item.packageId,
			serviceSale: sale.id,
		});
	}

	for (const detail of paymentDetails) {
		await Payment.create({
			servicesale: sale.id,
			paymentMethod: detail.method,
			value: detail.amount,
			date: detail.date ? detail.date : new Date().toUTCString(),
		});
	}

	const debt = totalDue - total_paid;

	if (debt && debt > 0) {
		await Debt.create({
			clientName: clientname,
			value: debt,
			clientContact: {
				tel: clientTel ? clientTel : null,
				email: clientEmail ? clientEmail : null,
				identification: clientIdentification ? clientIdentification : null,
			},
			service: sale.id,
			dateRegistered: new Date().toUTCString(),
		});
	}
	return res.status(201).json({
		status: "success",
		data: sale,
	});
});

exports.getAllServiceSales = asyncWrapper(async (req, res) => {
	const { serviceId, packageId } = req.query;

	if (serviceId) {
		let packageCondition = { service_package: packageId ? packageId : null };
		const sales = await ServiceSale.findAll({
			where: {
				service: serviceID,
				...packageCondition,
			},
			include: [
				{
					model: ServiceDetail,
					include: [{ model: Service }, { model: ServicePackage }],
				},
				{ model: Payment, include: [{ model: AccountType }] },
				{ model: Debt },
			],
		});

		return res.status(200).json({
			status: "success",
			data: sales,
		});
	} else {
		const sales = await ServiceSale.findAll({
			include: [
				{
					model: ServiceSaleDetail,
					include: [{ model: Service }, { model: ServicePackage }],
				},
				{ model: Payment, include: [{ model: AccountType }] },
				{ model: Debt },
			],
		});
		return res.status(200).json({
			status: "success",
			data: sales,
		});
	}
});

exports.getServiceSalesWithDebts = asyncWrapper(async (req, res) => {
	const sales = await ServiceSale.findAll({
		include: [
			{
				model: ServiceSaleDetail,
				include: [{ model: Service }, { model: ServicePackage }],
			},
			{ model: Payment, include: [{ model: AccountType }] },
			{ model: Debt, where: { value: { [Op.not]: null } } },
		],
	});

	return res.status(200).json({
		status: "success",
		data: sales,
	});
});

exports.getServicesDashboardData = asyncWrapper(async (req, res) => {
	const allTodaySales = await ServiceSale.findAll();
	const allToday = allTodaySales.filter(
		(el) => new Date(el.datefor).toDateString() === new Date().toDateString()
	);

	return res.status(200).json({
		status: "success",
		data: {
			sales: allToday.length,
		},
	});
});

// exports.update= asyncWrapper(async(req,res)=>{})

exports.deleteOne = asyncWrapper(createController(Service).deleteOne);
exports.deleteAll = asyncWrapper(createController(Service).deleteAll);
