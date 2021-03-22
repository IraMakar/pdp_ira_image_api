"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.likes.belongsTo(models.Picture, {
        foreignKey: "picture_id",
      });
      models.likes.belongsTo(models.view_history, {
        foreignKey: "picture_id",
      });
    }
  }
  likes.init(
    {
      picture_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "likes",
    }
  );
  return likes;
};
