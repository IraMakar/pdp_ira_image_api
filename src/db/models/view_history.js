"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class view_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.view_history.belongsTo(models.Picture, {
        foreignKey: "picture_id",
      });
      models.view_history.hasMany(models.hashtags_view_history, {
        foreignKey: "history_id",
      });
      models.view_history.belongsTo(models.category, {
        foreignKey: "category_id",
      });
      models.view_history.hasMany(models.likes, {
        foreignKey: "picture_id",
      });
    }
  }
  view_history.init(
    {
      picture_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      search_type: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
      nickname: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "view_history",
    }
  );
  return view_history;
};
