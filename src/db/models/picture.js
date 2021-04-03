"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Picture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Picture.hasMany(models.Hashtag, {
        foreignKey: "picture_id",
      });
        models.Picture.belongsTo(models.category, {
          foreignKey: "category_id",
        });
      models.Picture.hasMany(models.view_history, {
        foreignKey: "picture_id",
      });
      models.Picture.hasMany(models.likes, {
        foreignKey: "picture_id",
      }); 
    }
  }
  Picture.init(
    {
      name: DataTypes.STRING,
      url: {
        type: DataTypes.STRING,
      },
      artist_id: {
        type: DataTypes.INTEGER,
      },
      height: {
        type: DataTypes.INTEGER,
      },
      width: {
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.STRING,
      },
      category_id: {
        type: DataTypes.INTEGER,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
      } 
    },
    {
      sequelize,
      modelName: "Picture",
    }
  );
  return Picture;
};
