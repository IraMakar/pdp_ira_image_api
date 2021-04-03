const db = require("../models");

const insertHashtags = async (params) => {
  const { Hashtag } = db;
  const { hashtags, picture_id } = params;
  const tags = hashtags.map(hashtag => hashtag.replace(/\s/g, ''));
  return Hashtag.bulkCreate(
    tags.map((hashtag) => ({ tag: hashtag, picture_id }))
  );
};

module.exports = { insertHashtags };
