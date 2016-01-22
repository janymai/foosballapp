'use strict';

console.log('mock.js')

/** Endpoint */
var startMock = function ($httpBackend, $rootScope) {
  $httpBackend.when('GET', '/api/games').respond(function () {
    console.log('GET api/games');
  });
};

angular.module('foosballApp')
.config(function($provide) {
  $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
})
.run(function($httpBackend, $rootScope) {
  startMock($httpBackend, $rootScope);
});
