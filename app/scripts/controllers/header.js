'use strict';

angular.module('foosballApp')
  .controller('HeaderCtrl', function ($scope, ngDialog) {
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
     * Login
     * Show dialog to implement Login
    */
    $scope.login = function () {
      ngDialog.open({
        template: 'views/access.html',
        className: 'ngdialog-theme-default access-dialog',
        controller: 'AccessCtrl'
      });
    }
  });
