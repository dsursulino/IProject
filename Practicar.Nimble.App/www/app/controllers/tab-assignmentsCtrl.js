/// <reference path="spAuthService.js" />
angular.module('nimble.controllers.tabAssignments', [])

.controller('tabAssignmentsCtrl', function ($scope, $ionicSideMenuDelegate) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});
   
    $scope.openRightMenu = function () {
        $ionicSideMenuDelegate.toggleRight();
    };

   
})