'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.category.hasMany(models.view_history, {
        foreignKey: "category_id",
      });    
      models.category.hasMany(models.Picture, {
        foreignKey: "category_id",
      }); }
  };
  category.init({
    name: DataTypes.STRING,
    settings: DataTypes.JSONB,
  }, {
    sequelize,
    modelName: 'category',
  });
  return category;
};