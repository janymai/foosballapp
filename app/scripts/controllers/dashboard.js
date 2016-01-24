'use strict';

angular.module('foosballApp')
  .controller('DashboardCtrl', function ($scope, DashboardService) {

    // Get Last Games
    $scope.getLastGames = function () {
      DashboardService
        .getLastGames()
        .then(function (resp) {
          console.log(resp.data);
          $scope.matchesData = resp.data;
        });
    };

    $scope.getLastGames();
  });
