const db = require("../models");

const findPicturesByHashtag = async (hashtag, params) => {
  const { limit, offset, user_id } = params;
  if (limit) delete params.limit;
  if (offset) delete params.offset;
  if (user_id) delete params.user_id;
  const { Picture, Hashtag, likes } = db;
  return Picture.findAll({
    limit,
    offset,
    where: {
      id: {
        [db.Sequelize.Op.in]: db.Sequelize.literal(
          `( SELECT picture_id FROM public."Hashtags" WHERE lower(tag) IN (${
            typeof hashtag == "string"
              ? `"${hashtag}"`
              : `'${hashtag.join("','")}'`
          }) )`
        ),
      },
    },
    include: [
      {
        model: Hashtag,
      },
      {
        model: likes,
        where: {
          user_id
        },
        required: false
      },
    ],
  });
};

module.exports = { findPicturesByHashtag };
