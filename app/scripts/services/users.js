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
      },

      /**
      * Create users
      * POST: /api/users
      *
      * @return {Promise}
      */
      postUser: function (params) {
        return service.post(params);
      }
    };
  });
