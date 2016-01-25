'use strict';

angular.module('foosballApp')
  .factory('UserService', function (Restangular) {
    // define service
    var service = Restangular.all('users');

    return {
      /**
      * Get users
      * GET: /api/users
      *
      * @return {Promise}
      */
      getUsers: function () {
        return service.customGET();
      }
    };
  });
