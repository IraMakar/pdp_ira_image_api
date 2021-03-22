const db = require("../models");

const insertHashtags = async (params) => {
  const { Hashtag } = db;
  const { hashtags, picture_id } = params;
  return Hashtag.bulkCreate(
    hashtags.map((hashtag) => ({ tag: hashtag, picture_id }))
  );
};

module.exports = { insertHashtags };
