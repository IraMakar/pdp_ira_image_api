const db = require("../models");

const deletePicture = async (params) => {
  const { Picture } = db;
  return Picture.destroy({
    where: params,
  });
};

module.exports = { deletePicture };
