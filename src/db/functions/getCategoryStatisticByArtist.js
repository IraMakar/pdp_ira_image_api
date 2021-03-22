const db = require("../models");

const getCategoryStatisticByArtist = async (params) => {
  console.log("params", params);
  const { artist_id } = params;
  const { view_history, category, Picture } = db;

  const statistic = await view_history.findAll({
    attributes: [
        "category_id",
        [db.Sequelize.literal("COUNT(DISTINCT(view_history.id))"), "countByCategory"],
    ],
    group: ["view_history.category_id", "category.id"],
    include: [
        {
            model: Picture,
            attributes: [],
            where: {
                artist_id
            }
        },
        {
            model: category,
            required: true
        }
    ]
  });

  return statistic;
};

module.exports = { getCategoryStatisticByArtist };
