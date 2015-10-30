/// <reference path="spAuthService.js" />
angular.module('nimble.controllers.tabAssignments', [])

.controller('tabAssignmentsCtrl', function ($rootScope, $document, $timeout, $scope, $ionicSideMenuDelegate, assignmentService) {

    $scope.Assignments = {};

    $scope.Assignments = assignmentService.getOwner().success(function (data) {
        $scope.Assignments = data.results;
        $scope.$broadcast('scroll.refreshComplete');
    }).error(function (data) {
        var alertPopup = $ionicPopup.alert({
            title: 'Processamento inválido',
            template: data
        });
        $scope.$broadcast('scroll.refreshComplete');
    });

    $scope.openRightMenu = function () {
        $ionicSideMenuDelegate.toggleRight();
    };


   
})