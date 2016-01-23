'use strict';

var nobackend = document.URL.match(/nobackend/);

/** Endpoint */
var startMock = function ($httpBackend) {
  $httpBackend.whenGET('/api/games').respond(function () {
    var data = [];
    return [200, {data: data}, {}];
  });

  // If GET it is not api it will this passThrough
  $httpBackend.when('GET', /views/).passThrough();

};

angular.module('foosballApp')
  .config(function($provide) {
    if (nobackend) {
      $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
    }
  })
  .run(function($httpBackend) {
    if (nobackend) {
      startMock($httpBackend);
    }
  });
