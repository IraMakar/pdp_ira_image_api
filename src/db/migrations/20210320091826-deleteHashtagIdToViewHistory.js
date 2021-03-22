'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'view_histories',
      'hashtag_id'
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'view_histories',
      'hashtag_id',
     Sequelize.INTEGER
    );
  }
};
