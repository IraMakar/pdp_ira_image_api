const db = require("../models");

const findArtists = async (params) => {
  const { Picture } = db;
  return Picture.findAll({
    attributes: ['artist_id'],
    group: 'artist_id'
  });
};

module.exports = { findArtists };
