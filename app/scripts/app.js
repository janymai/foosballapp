'use strict';


angular.module('foosballApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router'
])
  .config(function (
    $stateProvider,
    $urlRouterProvider,
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

    // make href accept javascript:void(0) as a url
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);
  });
