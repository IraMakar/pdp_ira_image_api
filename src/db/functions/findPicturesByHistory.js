const db = require("../models");

const findPicturesByHistory = async (params) => {
  const { limit, offset, user_id } = params;
  if (limit) delete params.limit;
  if (offset) delete params.offset;
  const { view_history, Picture, Hashtag, likes } = db;
  return view_history.findAll({
    limit,
    offset,
    order: [
      ['id', 'DESC'],
  ],
    where: {
      user_id,
    },
    include: [
      {
        model: Picture,
        where: {is_deleted:{[db.Sequelize.Op.not]:true}},
        include: [
          {
            model: Hashtag
          },
          {
            model: likes,
            where: {
              user_id
            },
            required: false,
          }
        ]
      }
    ]
  });
};

module.exports = { findPicturesByHistory };
