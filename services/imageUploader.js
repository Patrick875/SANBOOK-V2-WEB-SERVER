//jshint esversion:9
const cloudinary = require("cloudinary");
const { asyncWrapper } = require("../utils/asyncWrapper");

exports.imageUploader = asyncWrapper(async (req, res, next) => {
	let promises = [];
	let thumbnailPromises = [];
	let profilePromises = [];
	let images = [];
	let thumbnails = [req.body.thumbnail];
	let profileImage = [req.body.profileImage];
	if (req.body.thumbnail || req.body.profileImage || req.body.images) {
		if (req.body.profileImage) {
			profilePromises = profileImage.map((profile) => {
				return cloudinary.v2.uploader.upload(
					profile,
					{
						folder: "sanbook-user-profiles",
						asset_id: req.body.names + "-profile",
					},
					function (error, result) {
						console.log(error);
					}
				);
			});
			profileImage = await Promise.all(profilePromises);
			profileImage = profileImage.map((profile) => profile.secure_url);
			req.body.profileImage = profileImage[0];
		}
		if (req.body.thumbnail) {
			thumbnailPromises = thumbnails.map((thumbnail) => {
				return cloudinary.v2.uploader.upload(
					thumbnail,
					{
						folder: "sanbook-thumbnails",
						asset_id: req.body.name + "-thumbnail",
					},
					function (error, result) {
						console.log(error);
					}
				);
			});
			thumbnails = await Promise.all(thumbnailPromises);
			thumbnails = thumbnails.map((thumbnail) => thumbnail.secure_url);
			req.body.thumbnail = thumbnails[0];
		}
		if (req.body.images) {
			promises = req.body.images.map((image) => {
				return cloudinary.v2.uploader.upload(
					image,
					{
						folder: "sanbook-images",
						asset_id: req.body.name,
					},
					function (error, result) {
						console.log(error);
					}
				);
			});
			images = await Promise.all(promises);
			images = images.map((image) => image.secure_url);
			req.body.images = images;
		}

		console.log("IMAGE UPLOADER ......");

		next();
	} else {
		console.log("NO IMAGES ON BODY ......");
		return next();
	}
});

//exports.fileUploader= asyncWrapper()
