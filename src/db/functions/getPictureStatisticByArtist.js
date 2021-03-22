const db = require("../models");

const getPictureStatisticByArtist = async (params) => {
  console.log("params", params);
  const { artist_id } = params;
  const { view_history, Picture, likes } = db;

  const statistic = await Picture.findAll({
    where: {
      artist_id,
    },
    attributes: {
      include: [
        [
          db.Sequelize.literal("COUNT(DISTINCT(view_histories.id))"),
          "countViewByPicture",
        ],
        [
          db.Sequelize.literal("COUNT(DISTINCT(likes.id))"),
          "countLikesByPicture",
        ],
      ],
    },
    group: ["view_histories.picture_id", "Picture.id", "likes.picture_id"],
    include: [
      {
        model: view_history,
        attributes: [],
      },
      {
        model: likes,
        attributes: [],
      },
    ],
  });

  return statistic;
};

module.exports = { getPictureStatisticByArtist };
