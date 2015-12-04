/// <reference path="spAuthService.js" />
angular.module('nimble.controllers.Menu', [])

.controller('menuCtrl', function ($scope, $state, $ionicSideMenuDelegate, $ionicPopup, $timeout, spAuthenticate) {
  
    $scope.openRightMenu = function () {
        $ionicSideMenuDelegate.toggleRight();
    };

    $scope.Load = function () {
        $scope.User = spAuthenticate.oAuth().User.Profile;
    };

   // $scope.User = spAuthenticate.oAuth().User.Profile;



});