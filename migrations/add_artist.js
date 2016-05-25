'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn('favorites', 'artist', {type: Sequelize.STRING});
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn('favorites', 'artist');
  }
};
