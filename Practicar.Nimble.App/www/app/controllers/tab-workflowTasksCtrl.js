/// <reference path="spAuthService.js" />
angular.module('nimble.controllers.tabWorkflowTasks', [])

.controller('workflowTasksCtrl', function ($rootScope, $document, $timeout, $scope, $ionicSideMenuDelegate, $ionicPopup, workflowTasksService) {
    $scope.events = [];

    $scope.openRightMenu = function () {
        $ionicSideMenuDelegate.toggleRight();
    };

    workflowTasksService.Exists().success(function (id) {

        workflowTasksService.getAllOwner(id).success(function (result) {

            angular.forEach(result, function (task) {
                try {
                    this.push({
                        badgeClass: 'info',
                        badgeIconClass: '',
                        title: task.Title,
                        startDate: new Date(task.StartDate),
                        finishDate: (task.DueDate == null ? null : new Date(task.DueDate)),
                        content: task.Body,

                    });
                } catch (e) {
                    window.alert(e);
                }
            }, $scope.events);

            $scope.$broadcast('scroll.refreshComplete');
        }).error(function (error) {

            $scope.teste = error;
            $scope.$broadcast('scroll.refreshComplete');
        });

    }).error(function (data) {
        var alertPopup = $ionicPopup.alert({
            title: 'Atenção',
            template: data
        });
        $scope.$broadcast('scroll.refreshComplete');
    });


    // optional: not mandatory (uses angular-scroll-animate)
    $scope.animateElementIn = function ($el) {
        $el.removeClass('hidden');
        $el.addClass('bounce-in');
    };

    // optional: not mandatory (uses angular-scroll-animate)
    $scope.animateElementOut = function ($el) {
        $el.addClass('hidden');
        $el.removeClass('bounce-in');
    };
});