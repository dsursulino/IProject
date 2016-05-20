/// <reference path="spAuthService.js" />
angular.module('nimble.controllers.assignment', [])

.controller('assignmentCtrl', function ($scope, $stateParams, $ionicSideMenuDelegate, $ionicPopup, $timeout, assignmentService) {

    $scope.openRightMenu = function () {
        $ionicSideMenuDelegate.toggleRight();

    };



    $scope.Save = function () {

        assignmentService.update($scope.assignment).success(function (data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Sucesso',
                template: 'Tarefa atualizada, é necessário a aprovação do gerente de projetos.'
            });
            $scope.RefreshRange(false);
        }).error(function (data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Processamento inválido',
                template: data
            });
        });

    };

    $scope.RefreshRange = function (create) {
        if (create) {
            $timeout(function () {
                $('#divAssignmentPercentWorkCompleted').easyPieChart({
                    lineWidth: 9,
                    barColor: '#01cf1c',
                    trackColor: '#e5e9ec',
                    scaleColor: false,
                    size: 70
                })
            }, 0);
        }
        else {
            $timeout(function () { $('#divAssignmentPercentWorkCompleted').data('easyPieChart').update($scope.assignment.PercentComplete); }, 0);
        }

    };

    assignmentService.get($stateParams.id).success(function (data) {
        $scope.assignment = data;
        $scope.RefreshRange(true);
    }).error(function (data) {
        var alertPopup = $ionicPopup.alert({
            title: 'Processamento inválido',
            template: data
        });
    });


});