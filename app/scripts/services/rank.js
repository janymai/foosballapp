'use strict';

angular.module('foosballApp')
  .factory('RankService', function (Restangular) {
    // define service
    var service = Restangular.all('rank');

    return {
      /**
      * Get players/teams ranking
      * GET: /api/rank/{players/team}
      *
      * @return {Promise}
      */
      getRank: function (param) {
        return service.customGET(param);
      }
    };
  });
