const db = require("../models");

const deletePicture = async (params) => {
  const { Picture } = db;
  return Picture.update( {is_deleted : true }, {
    where: params,
  });
};

module.exports = { deletePicture };
