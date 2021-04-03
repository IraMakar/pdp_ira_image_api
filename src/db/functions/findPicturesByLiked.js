const db = require("../models");

const findPicturesByLiked = async (params) => {
  const { limit, offset, user_id } = params;
  if (limit) delete params.limit;
  if (offset) delete params.offset;
  const { Picture, Hashtag, likes } = db;
  return Picture.findAll({
    limit,
    offset,
    order: [["id", "DESC"]],
    where: {is_deleted:{[db.Sequelize.Op.not]:true}},
    include: [
      {
        model: Hashtag,
      },
      {
        model: likes,
        where: {
          user_id,
        },
        required: true,
      },
    ],
  });
};

module.exports = { findPicturesByLiked };
