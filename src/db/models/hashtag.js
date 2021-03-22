"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Hashtag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Hashtag.belongsTo(models.Picture, {
        foreignKey: "picture_id",
      });
      models.Hashtag.hasMany(models.hashtags_view_history, {
        foreignKey: "hashtag_id",
      });
    }
  }
  Hashtag.init(
    {
      tag: DataTypes.STRING,
      picture_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Hashtag",
    }
  );
  return Hashtag;
};
