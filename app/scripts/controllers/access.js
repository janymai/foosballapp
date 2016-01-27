'use strict';

angular.module('foosballApp')
  .controller('AccessCtrl', function ($rootScope, $scope, UserService, ngDialog, AuthenticateService) {
    $scope.retrySubmit = false;
    $scope.retrySignIn = false;
    /**
     * Create user
     * member contain:
     * = firstName (required min-length: 6)
     * = lastName (required min-length: 6)
     * = email address (required need to have @roomorama.com)
     * = password (required min-length: 6)
    */
    $scope.createUser = function (formNewMember, member) {

      $scope.retrySubmit = true;
      $scope.retrySignIn = false;

      /**
       * Call API to Create user
       * If form formNewMember is valid
       * Call API create user
       * If form formNewMember is invalid
       * Show popup to inform that can not create user
      */
      if (formNewMember.$valid) {
        UserService
          .postUser(member)
          .then(function (resp) {
            ngDialog.closeAll();
            $rootScope.currentUser = resp.user;
          }, function (resp) {
            $scope.message = "Can not create User."
            ngDialog.open({
              template: 'views/error-popup.html',
              scope: $scope
            });
          });
      }
    };

    /**
     * Sign in
     * user contain:
     * = email address (required need to have @roomorama.com)
     * = password (required min-length: 6)
    */
    $scope.signin = function (formSignin, user) {

      $scope.retrySubmit = false;
      $scope.retrySignIn = true;

      if (formSignin.$valid) {
        AuthenticateService
          .login(user)
          .then(function (resp) {
            ngDialog.closeAll();
            $rootScope.currentUser = resp.user;
          }, function (resp) {
            $scope.message = "Wrong email or password"
            ngDialog.open({
              template: 'views/error-popup.html',
              scope: $scope
            });
          });
      }

    };
  });
