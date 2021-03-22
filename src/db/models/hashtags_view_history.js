"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class hashtags_view_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.hashtags_view_history.belongsTo(models.view_history, {
        foreignKey: "history_id",
      });
      models.hashtags_view_history.belongsTo(models.Hashtag, {
        foreignKey: "hashtag_id",
      });
    }
  }
  hashtags_view_history.init(
    {
      history_id: DataTypes.INTEGER,
      hashtag_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "hashtags_view_history",
    }
  );
  return hashtags_view_history;
};
