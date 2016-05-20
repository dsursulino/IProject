/// <reference path="spAuthService.js" />
angular.module('nimble.controllers.tabAssignments', [])

.controller('tabAssignmentsCtrl', function ($rootScope,  $state, $document, $timeout, $scope, $ionicSideMenuDelegate, $ionicPopup ,assignmentService) {

    $scope.Assignments = {};

    $scope.LoadPercentComplete = function () {

        $timeout(function () {
            $("[name='progressAssignmentPercentWorkCompleted']").each(function () {
                var progressbar = $(this),
                            max = progressbar.attr('max'),
                            time = (1000 / max) * 5,
                            value = progressbar.attr('data-value');


                progressbar.val(value);
                //var taskid = progressbar.attr('data-taskid');
                //$timeout(function () {
                //    assignmentService.getAssignedsCount(taskid).success(function (data) {
                //        $('#span' + taskid).text(data);
                //    }).error(function (data) {
                //        var alertPopup = $ionicPopup.alert({
                //            title: 'Processamento inválido',
                //            template: data
                //        });
                //        $('#span' + taskid).text('-');
                //    });
                //},2);


            });

      

        }, 0);
    };

    $scope.Edit = function (id) {

        $state.go("startTabs.assignments-edit", { "id": id });

    };
   

      $scope.GetTasks= function GetTasks() {
        
    

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


    };


   

    $scope.openRightMenu = function () {
        $ionicSideMenuDelegate.toggleRight();
    };



})