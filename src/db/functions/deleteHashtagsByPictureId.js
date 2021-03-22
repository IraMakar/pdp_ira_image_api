const db = require("../models");

const deleteHashtagsByPictureId = async (params) => {
  const { Hashtag } = db;
  return Hashtag.destroy({
    where: params,
  });
};

module.exports = { deleteHashtagsByPictureId };
