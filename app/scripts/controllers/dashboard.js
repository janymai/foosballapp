'use strict';

angular.module('foosballApp')
  .controller('DashboardCtrl', function ($scope, GameService, RankService) {

    // Get Last Games
    $scope.getLastGames = function () {
      GameService
        .getLastGames()
        .then(function (resp) {
          $scope.matchesData = resp.results;
        }, function () {
          $scope.errorMessage = 'Can not get data';
        });
    };

    $scope.getLastGames();

    // Get players/teams ranking
    $scope.getRank = function (param) {
      RankService
        .getRank(param)
        .then(function (resp) {
          $scope.rankData = resp.results;
        }, function () {
          $scope.errorMessage = 'Can not get data';
        });
    };

    $scope.getRank('players');

    // Switch tabs call loadRank again
    $scope.loadRank = function(param) {
      $scope.type = param;
      $scope.getRank(param);
    }
  });
