'use strict';

angular.module('foosballApp')
  .controller('NewGameCtrl', function ($scope, UserService) {
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


    // $scope.sortingLog = [];

    $scope.draggableOptions = {
      connectWith: ".connected-drop-target-sortable",
      receive: function(e, ui) {
        // var $this = $(this);
        console.log('receive');
        // if ($this.children('li').length > 1 && $this.attr('id') != "main_list") {
        //   console.log('Only one per list!');
        //   $(ui.sender).sortable('cancel');
        // }
      },
      stop: function (e, ui) {
        var $this = $(this);
        console.log($this);
        // if the element is removed from the first container
        if ($this.children('li').length > 1 && $this.attr('id') != "main_list") {
        }
        if (ui.item.sortable.source.hasClass('draggable-element-container') &&
            ui.item.sortable.droptarget &&
            ui.item.sortable.droptarget !== ui.item.sortable.source &&
            ($scope.team_1.length < 3 && $scope.team_2.length < 3) &&
            ui.item.sortable.droptarget.hasClass('connected-drop-target-sortable')) {
          // restore the removed item
          ui.item.sortable.sourceModel.push(ui.item.sortable.model);
        }
      }
    };

  });
