const db = require("../models");

const upsertLike = async (params) => {
  const { user_id, picture_id } = params;
  const { likes } = db;

  let like = await likes.findOne({
    where: {
      user_id,
      picture_id,
    },
  });

  if (like) {
    like = await likes.destroy({ where: { user_id, picture_id } });
  } else {
    like = await likes.create({ user_id, picture_id });
  }
  return like;
};

module.exports = { upsertLike };
