const db = require("../models");

const findPictures = async (params) => {
  const { limit, offset, user_id } = params;
  if (limit) delete params.limit;
  if (offset) delete params.offset;
  if (user_id) delete params.user_id;
  const { Picture, Hashtag, likes } = db;
  return Picture.findAll({
    where: params,
    limit,
    offset,
    include: [
      {
        model: Hashtag,
      },
      {
        model: likes,
        where: {
          user_id,
        },
        required: false
      }
    ],
  });
};

module.exports = { findPictures };
