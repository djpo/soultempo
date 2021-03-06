'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn('favorites', 'title', {type: Sequelize.STRING});
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn('favorites', 'title');
  }
};
