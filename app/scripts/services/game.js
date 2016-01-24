'use strict';

angular.module('foosballApp')
  .factory('GameService', function Game(Restangular) {
    // define service
    var service = Restangular.all('games');

    return {
      /**
      * Get last games
      * GET: /api/games
      *
      * @return {Promise}
      */
      getLastGames: function () {
        return service.customGET();
      }
    };
  });
