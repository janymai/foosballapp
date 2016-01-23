'use strict';

angular.module('foosballApp')
  .controller('DashboardCtrl', function ($scope, DashboardService) {

    $scope.getLastGames = function () {
      DashboardService
        .getLastGames()
        .then(function (resp) {
          console.log(resp)
          $scope.data = resp[0];
        });
    };

    $scope.getLastGames();
  });
