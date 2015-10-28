/// <reference path="spAuthService.js" />
angular.module('nimble.controllers.tabWorkflowTasks', [])

.controller('workflowTasksCtrl', function ($scope, $ionicSideMenuDelegate) {
    
    $scope.openRightMenu = function () {
        $ionicSideMenuDelegate.toggleRight();
    };

    $scope.settings = {
        enableFriends: true
    };
});