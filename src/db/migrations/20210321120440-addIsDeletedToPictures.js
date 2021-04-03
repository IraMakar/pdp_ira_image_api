'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Pictures',
      'is_deleted',
     Sequelize.BOOLEAN
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Pictures',
      'is_deleted'
    );
  }
};
