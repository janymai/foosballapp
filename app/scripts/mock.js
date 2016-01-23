'use strict';

var nobackend = document.URL.match(/nobackend/);
/** Endpoint */
var startMock = function ($httpBackend, $rootScope) {
  $httpBackend.when('GET', '/api/games').respond(function () {
    console.log('GET api/games');
    return [200, {}, {}];
  });
};

angular.module('foosballApp')
  .config(function($provide) {
    if (nobackend) {
      console.log('mock.js')
      $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
    }
  }).run(function($rootScope, $httpBackend) {
    if (nobackend) {
      console.log('mock.js')
      startMock($httpBackend, $rootScope, { authenticated: authenticated, user: user });
    }
  });
