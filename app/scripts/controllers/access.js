'use strict';

angular.module('foosballApp')
  .controller('AccessCtrl', function ($scope) {
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

      if (formNewMember.$valid) {
        console.log('valid');
      }
      // that ra thi nen goi api
      console.log(formNewMember, member);
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
        console.log('valid');
      }
      // that ra thi nen goi api
      console.log(formSignin, user);
    };
  });
