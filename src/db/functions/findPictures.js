const db = require("../models");

const findPictures = async (params) => {
  const { limit, offset, user_id } = params; 
  console.log(params);
  if (limit) delete params.limit;
  if (offset) delete params.offset;
  if (user_id) delete params.user_id;
  const { Picture, Hashtag, category, likes } = db;
  return Picture.findAll({
    where: {...params, is_deleted:{[db.Sequelize.Op.not]:true}},
    limit,
    offset,
    include: [
      {
        model: Hashtag,
      },
      {
        model: category,
      }, 
      {
        model: likes,
        where: user_id ? {
          user_id,
        } : {},
        required: false
      }
    ],
  });
};

module.exports = { findPictures };
