const db = require("../models");

const getNicknameStatisticByArtist = async (params) => {
  console.log("params", params);
  const { artist_id } = params;
  const { view_history, Picture } = db;

  const statistic = await view_history.findAll({
    attributes: [
      "nickname",
      [
        db.Sequelize.literal("COUNT(DISTINCT(view_history.id))"),
        "countByNickname",
      ],
    ],
    group: ["view_history.nickname"],
    include: [
      {
        model: Picture,
        attributes: [],
        where: {
          artist_id,
        },
      },
    ],
  });

  return statistic;
};

module.exports = { getNicknameStatisticByArtist };
