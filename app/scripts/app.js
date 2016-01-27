'use strict';

// Detect the case for authenticated
var authenticated = document.URL.match(/authenticated/);
var BASIC_USER = {id: 1234, name: 'Test User'};

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

  })
  .run(function ($rootScope, ngDialog) {
    /**
     * Current user
     * Using URL to convention
     * Current User: URL match /authenticated/
     * Is not User : URL not match /authenticated/
    */
    $rootScope.currentUser = authenticated ? BASIC_USER : null;

    if ($rootScope.currentUser) {
      console.log('abc');
    } else {
      ngDialog.open({
        template: 'views/access.html',
        className: 'ngdialog-theme-default access-dialog',
        controller: 'AccessCtrl'
      });
    }

  });
