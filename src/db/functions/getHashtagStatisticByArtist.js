const db = require("../models");

const getHashtagStatisticByArtist = async (params) => {
  console.log("params", params);
  const { artist_id } = params;
  const { view_history, hashtags_view_history, Hashtag, Picture } = db;

console.log(artist_id);

  const statistic = await hashtags_view_history.findAll({
    attributes: [
      "hashtag_id",
      [db.Sequelize.literal("COUNT(DISTINCT(hashtags_view_history.id))"), "countByHashtag"],
    ],
    group: ["hashtag_id", "Hashtag.id"],
    include: [
      {
        model: view_history, required: true,
        attributes: [],
        include: [
          {
            model: Picture,
            where: {
              artist_id,
            },
            attributes: [],
            required: true,
          },
        ],
      },
      {
        model: Hashtag,
      },
    ],
  });

  return statistic;
};

module.exports = { getHashtagStatisticByArtist };
