'use strict';

angular.module('foosballApp')
  .controller('HeaderCtrl', function ($scope) {
    /**
     * click on button new game
     * show content newgame template
    */
    $scope.isShowNewGame = false;

    // Change the name button creategame base on click Create Game
    $scope.optionCreateBtn = function () {
      $scope.strOptionCreate = $scope.isShowNewGame ? 'x Close' :'+ New Game';
    };

    $scope.optionCreateBtn();

    /**
     * Show template of create new game
     * newgame template will close
    */
    $scope.showNewGame = function () {
      $scope.isShowNewGame = !$scope.isShowNewGame;
      $scope.optionCreateBtn();
    };

    /**
     * when finished create a new game
     * newgame template will close
    */
    $scope.createGame = function () {
      $scope.isShowNewGame = false;
      $scope.optionCreateBtn();
    };
  });
