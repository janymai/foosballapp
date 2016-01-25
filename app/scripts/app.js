'use strict';


angular.module('foosballApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.sortable',
  'restangular',
  'angularMoment',
  'ngDialog'
])
  .config(function (
    $stateProvider,
    $urlRouterProvider,
    RestangularProvider,
    $compileProvider
  ) {
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $stateProvider
      .state('main', {
        url: '/main',
        templateUrl: 'views/main.html',
        controller:'MainCtrl'
      })
      .state('dashboard', {
        url: '/',
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      });

    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise('/');

    // Config Restangular
    RestangularProvider.setBaseUrl('/api/');

    // make href accept javascript:void(0) as a url
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);

  });
