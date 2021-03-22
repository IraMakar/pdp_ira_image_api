const db = require("../models");

const insertHistory = async (params) => {
  const { view_history, hashtags_view_history } = db;
  const history = await view_history.create(
      params
  );
  if (params.hashtags_history_view_ids) {
    await hashtags_view_history.bulkCreate(params.hashtags_history_view_ids.map(hashtag_id => ({
      hashtag_id,
      history_id: history.id
    })));
  }
  return history;
};

module.exports = { insertHistory };
