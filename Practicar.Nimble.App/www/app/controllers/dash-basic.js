/// <reference path="spAuthService.js" />
angular.module('nimble.controllers.dashboardBasic', [])

.controller('dashboardBasicCtrl', function ($rootScope, $state, $timeout, $scope, $ionicSideMenuDelegate, $ionicPopup, $filter, projectService, assignmentService) {


    $scope.openRightMenu = function () {
        $ionicSideMenuDelegate.toggleRight();
    };
    $scope.FillMyProjects = function (dataMyprojects) {
        $('#divMyProjects').highcharts({
            chart: {
                type: 'bar',
                backgroundColor: 'transparent',
                margin: 0

            },
            exporting: { enabled: false },
            title: {
                text: ''
                , margin: 0
            },
            xAxis: {
                categories: ['Projetos']
                , gridLineWidth: 0
                , lineWidth: 0
                , min: 0
                , visible: false

            },
            yAxis: {
                min: 0,
                visible: false
                , gridLineWidth: 0
                , title: {
                    text: 'Status por SPI'
                }
                , max: dataMyprojects.count
            },
            legend: {
                reversed: true,
                margin: 0,

            },
            credits: {
                enabled: false
            },
            plotOptions: {
                bar: {

                    dataLabels: {
                        enabled: true,
                        shadow: false,
                        style: {
                            textShadow: false,
                            color: "#FFFFFF",
                            fontWeight: "bold"
                        }
                    }
                }
                , series: {
                    pointWidth: 35,
                    groupPadding: 0,
                    stacking: 'normal',
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function () {

                                $state.go('startTabs.projects');


                            }
                        }
                    }
                }
            },
            series: [{
                name: 'Atrasado',
                color: '#FFB68E',
                data: [dataMyprojects.countDelayed]
            }, {
                name: 'Em Risco',
                color: '#EDED87',
                data: [dataMyprojects.countInRisk]
            }, {
                name: 'No Prazo',
                color: '#BFE387',
                data: [dataMyprojects.countOK]
            }]
        });

    };

    $scope.FillMyTasks2 = function (dataMyTasks) {
        $('#divMyTasks').highcharts({
            chart: {
                type: 'column',
                backgroundColor: 'transparent',
                shadow: false,
                marginTop: 0
            },
            exporting: { enabled: false },
            title: {
                text: '',
                margin: 0
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: dataMyTasks.categories,  //['Outubro', 'Novembro', 'Dezembro']
                crosshair: true,
                title: {
                    text: ''
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                },
            },
            tooltip: {
                headerFormat: '<span style="font-size:12pt">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Atrasada',
                color: '#ed7d31', //orange
                data: [dataMyTasks.lastMonth.countDelayed, dataMyTasks.actualMonth.countDelayed, dataMyTasks.futureMonth.countDelayed]
            }, {
                name: 'Não Iniciada',
                color: '#00447C', //blue
                data: [dataMyTasks.lastMonth.countFuture, dataMyTasks.actualMonth.countFuture, dataMyTasks.futureMonth.countFuture]
            }, {
                name: 'Concluídas',
                color: '#00b050', //greem
                data: [dataMyTasks.lastMonth.countOK, dataMyTasks.actualMonth.countOK, dataMyTasks.futureMonth.countOK]

            }, {
                name: 'Em andamento',
                color: '#ffc000',//yellow
                data: [dataMyTasks.lastMonth.countStarted, dataMyTasks.actualMonth.countStarted, dataMyTasks.futureMonth.countStarted]

            }]
        });

    }



    $scope.RefreshData = function () {

        projectService.getMyProjects().success(function (data) {
            $scope.Projects = data;
            var dataMyprojects = { "count": data.length, "countDelayed": 0, "countInRisk": 0, "countOK": 0 };

            angular.forEach(data, function (value) {
                var spi = (parseFloat(value.ProjectSPI) * 100);


                if (spi < 80) {
                    dataMyprojects.countDelayed++;
                }
                else if (spi >= 80 && spi < 90) {
                    dataMyprojects.countInRisk++;
                }
                else if (spi >= 90) {
                    dataMyprojects.countOK++;
                }

            });
            $scope.FillMyProjects(dataMyprojects)
            $scope.dataMyprojects = dataMyprojects;
            //  $scope.$broadcast('scroll.refreshComplete');
        }).error(function (data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Processamento inválido',
                template: data
            });
            $scope.$broadcast('scroll.refreshComplete');
        });

        assignmentService.getAssignedsLasted().success(function (data) {



            var dataMyTasks = {
                "count": data.length,
                "countStarted": 0,
                "categories": [],
                "lastMonth": {
                    "countDelayed": 0,
                    "countFuture": 0,
                    "countOK": 0,
                    "countStarted": 0
                },
                "actualMonth": {
                    "countDelayed": 0,
                    "countFuture": 0,
                    "countOK": 0,
                    "countStarted": 0
                },
                "futureMonth": {
                    "countDelayed": 0,
                    "countFuture": 0,
                    "countOK": 0,
                    "countStarted": 0
                }
            };
            var now = new Date();
            now.setMonth(now.getMonth() - 1);
            dataMyTasks.categories.push(Highcharts.dateFormat('%b/%Y', now));
            now.setMonth(now.getMonth() + 1);
            dataMyTasks.categories.push(Highcharts.dateFormat('%b/%Y', now));
            now.setMonth(now.getMonth() + 1);
            dataMyTasks.categories.push(Highcharts.dateFormat('%b/%Y', now));

            now = new Date();

            angular.forEach(data, function (value) {
                value.AssignmentStartDate = new Date(parseInt(value.AssignmentStartDate.substr(6)));
                value.AssignmentFinishDate = new Date(parseInt(value.AssignmentFinishDate.substr(6)));
                //Last
                if ((value.AssignmentStartDate.getMonth() <= now.getMonth() - 1 && value.AssignmentFinishDate.getMonth() >= now.getMonth() - 1) || value.AssignmentStartDate.getMonth() == now.getMonth() - 1 || value.AssignmentFinishDate.getMonth() == now.getMonth() - 1) {

                    if (value.AssignmentPercentWorkCompleted < 100 && value.AssignmentFinishDate < now) {
                        dataMyTasks.lastMonth.countDelayed++;
                    }
                    else if (value.AssignmentPercentWorkCompleted >= 100) {
                        dataMyTasks.lastMonth.countOK++;
                    }
                    else if (value.AssignmentPercentWorkCompleted == 0 && value.AssignmentStartDate > now) {
                        dataMyTasks.lastMonth.countFuture++;
                    }
                    else {
                        dataMyTasks.lastMonth.countStarted++;
                        //dataMyTasks.countStarted++;
                    }
                }
                //Actual
                if ((value.AssignmentStartDate.getMonth() <= now.getMonth() && value.AssignmentFinishDate.getMonth() >= now.getMonth()) || value.AssignmentStartDate.getMonth() == now.getMonth() || value.AssignmentFinishDate.getMonth() == now.getMonth()) {

                    if (value.AssignmentPercentWorkCompleted < 100 && value.AssignmentFinishDate < now ) {
                        dataMyTasks.actualMonth.countDelayed++;
                    }
                    else if (value.AssignmentPercentWorkCompleted >= 100) {
                        dataMyTasks.actualMonth.countOK++;
                    }
                    else if (value.AssignmentPercentWorkCompleted == 0 && value.AssignmentStartDate > now) {
                        dataMyTasks.actualMonth.countFuture++;
                    }
                    else if (value.AssignmentPercentWorkCompleted == 0 && value.AssignmentStartDate < now) {
                        dataMyTasks.actualMonth.countDelayed++;
                        //dataMyTasks.countStarted++;
                    }
                    else if (value.AssignmentPercentWorkCompleted > 0 && value.AssignmentFinishDate > now) {
                        dataMyTasks.actualMonth.countStarted++;
                        //dataMyTasks.countStarted++;
                    }
                }
                //future
                if ((value.AssignmentStartDate.getMonth() >= now.getMonth() + 1 || value.AssignmentFinishDate.getMonth() >= now.getMonth() + 1)) {

                    if (value.AssignmentPercentWorkCompleted < 100 && value.AssignmentFinishDate < now) {
                        dataMyTasks.futureMonth.countDelayed++;
                    }
                    else if (value.AssignmentPercentWorkCompleted >= 100) {
                        dataMyTasks.futureMonth.countOK++;
                    }
                    else if (value.AssignmentPercentWorkCompleted == 0 && value.AssignmentStartDate > now) {
                        dataMyTasks.futureMonth.countFuture++;
                    }
                    else {
                        dataMyTasks.actualMonth.countStarted++;
                        //dataMyTasks.countStarted++;
                    }
                }

                if (value.AssignmentPercentWorkCompleted > 0 && value.AssignmentPercentWorkCompleted < 100)
                    dataMyTasks.countStarted++;
            });
            $scope.FillMyTasks2(dataMyTasks);
            $scope.dataMyTasks = dataMyTasks;
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