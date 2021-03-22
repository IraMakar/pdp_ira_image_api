const db = require("../models");

const viewCountPerArtistBySearchType = async (params) => {
  const { artist_id } = params;
  if (artist_id) delete params.artist_id;
  const { Picture, view_history } = db;
  return view_history.count({
    where: params,
    include: [
      {
        model: Picture,
        where: {
          artist_id,
        },
        required: true,
      },
    ],
  });
};

module.exports = { viewCountPerArtistBySearchType };
