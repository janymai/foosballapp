'use strict';

angular.module('foosballApp')
  .controller('NewGameCtrl', function ($scope, UserService, ngDialog) {
    // Get Last Games
    var originalDraggables

    $scope.getUsers = function () {
      UserService
        .getUsers()
        .then(function (resp) {
          $scope.users = resp.results.map(function(x){
            return [x];
          });
        }, function () {
          $scope.errorMessage = 'Can not get data';
        });
    };

    $scope.getUsers();
    $scope.team_1 = [];
    $scope.team_2 = [];

    // Drag user for team_1 & team_2
    $scope.draggableOptions = {
      revert: false,
      cursor: "move",
      connectWith: ".connected-drop-target-sortable",
      stop: function (e, ui) {
        if ($scope.team_1.length == 2) {
          $scope.sortableOptions_team_1 = {disabled: true};
        }
        if ($scope.team_2.length == 2) {
          $scope.sortableOptions_team_2 = {disabled: true};
        }
        if ($scope.sortableOptions_team_1.disabled && $scope.sortableOptions_team_2.disabled) {
          $scope.draggableOptions = {disabled: true};
        }
      }
    };


    // when finished create a new game newgame template will close
    $scope.createGame = function () {
      if ($scope.team_1.length == $scope.team_2.length && $scope.team_1.length > 0 && $scope.team_2.length > 0) {
        $scope.getUsers();
      }
      else {
        $scope.message =  $scope.team_1.length != $scope.team_2.length ? 'The number of 2 items must be equal' : 'Can not create if member in each team is empty';

        ngDialog.open({
          template: 'views/error-popup.html',
          scope: $scope
        });
      }
    };
  });
