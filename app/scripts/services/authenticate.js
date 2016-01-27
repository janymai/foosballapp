'use strict';

angular.module('foosballApp')
  .service('AuthenticateService', function Authenticate(Restangular) {
    return {
      login: function(params) {
        return Restangular.all('login').post(params);
      }
    }
  });
