const db = require("../models");

const checkLike = async (params) => {
  const { user_id, picture_id } = params;
  const { likes } = db;

  let like = await likes.findOne({
    where: {
      user_id,
      picture_id,
    },
  });
  return like;
};

module.exports = { checkLike };
