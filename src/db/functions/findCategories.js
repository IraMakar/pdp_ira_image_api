const db = require("../models");

const findCategories = async (params) => {
  const { category } = db;
  return category.findAll({
    where: params,
  });
};

module.exports = { findCategories };
