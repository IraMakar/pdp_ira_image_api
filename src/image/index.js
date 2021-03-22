const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret,
});

const uploadImage = async (url) => {
  return cloudinary.uploader.upload(url);
};

module.exports = {
    uploadImage
};
