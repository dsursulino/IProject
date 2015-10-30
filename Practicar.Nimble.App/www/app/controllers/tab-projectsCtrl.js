﻿/// <reference path="spAuthService.js" />
angular.module('nimble.controllers.tabProjects', [])

.controller('tabProjectsCtrl', function ($scope, $state, $ionicSideMenuDelegate, $ionicPopup, $timeout, spAuthenticate) {

    $scope.openRightMenu = function () {
        $ionicSideMenuDelegate.toggleRight();

    };

    $scope.close = function () {
        $state.go('tab.dash');
    };

    $scope.Projects = {};

    $scope.RenderPiePercentComplete = function () {

        $("[name='pie-percentComplete']").easyPieChart({
            lineWidth: 9,
            barColor: '#7dc6ec',
            trackColor: '#e5e9ec',
            scaleColor: false,
            size: 70
        });
    };

    $scope.layoutDone = function () {

        $timeout(function () {
            $("[name='pie-percentComplete']").each(function () {
                var spi = (parseFloat($(this).attr("data-spi")) * 100);
                var color = '#7dc6ec';

                if (spi < 80) {
                    color = '#ff0000';
                }
                else if (spi >= 80 && spi < 90) {
                    color = '#ffd803';
                }
                else if (spi >= 90) {
                    color = '#01cf1c';
                }
                else {
                    color = '#7dc6ec';
                }


                $(this).easyPieChart({
                    lineWidth: 9,
                    barColor: color,
                    trackColor: '#e5e9ec',
                    scaleColor: false,
                    size: 70
                });
            });
        }, 0);

    };
    $scope.GetProjects = function GetProjects() {


        spAuthenticate.get(spAuthenticate.oAuth().ProjectURL + '/_api/ProjectData/[en-US]/Projects', true).success(function (data) {
            $scope.Projects = data.results;
            $scope.$broadcast('scroll.refreshComplete');
        }).error(function (data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Processamento inválido',
                template: data
            });
            $scope.$broadcast('scroll.refreshComplete');
        });



    };
});