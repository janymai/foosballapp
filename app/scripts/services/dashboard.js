'use strict';

angular.module('foosballApp')
  .factory('DashboardService', function (Restangular) {
    // define service
    var service = Restangular.all('games');

    return {
      /**
      * Get last games
      * API: /api/games
      *
      * @return {Promise}
      */
      getLastGames: function () {
        return service.customGET();
      }
    };
  });
