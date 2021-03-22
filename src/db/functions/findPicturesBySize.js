const db = require("../models");

const findPicturesBySize = async (params) => {
  const { limit, offset, minSize, maxSize, user_id } = params;
  if (limit) delete params.limit;
  if (offset) delete params.offset;

  const { Picture, Hashtag, likes } = db;
  return Picture.findAll({
    where: {
      [db.Sequelize.Op.or]: [
        {
          [db.Sequelize.Op.and]: [
            {
              height: {
                [db.Sequelize.Op.gte]: minSize[0],
              },
              width: {
                [db.Sequelize.Op.gte]: minSize[1],
              },
            },
            {
              height: {
                [db.Sequelize.Op.lte]: maxSize[0],
              },
              width: {
                [db.Sequelize.Op.lte]: maxSize[1],
              },
            },
          ],
        },
        {
          [db.Sequelize.Op.and]: [
            {
              height: {
                [db.Sequelize.Op.gte]: minSize[1],
              },
              width: {
                [db.Sequelize.Op.gte]: minSize[0],
              },
            },
            {
              height: {
                [db.Sequelize.Op.lte]: maxSize[1],
              },
              width: {
                [db.Sequelize.Op.lte]: maxSize[0],
              },
            },
          ],
        },
      ],
    },
    limit,
    offset,
    include: [
      {
        model: Hashtag,
      },
      {
        model: likes,
            where: {
              user_id
            },
            required: false,
      },
    ],
  });
};

module.exports = { findPicturesBySize };
