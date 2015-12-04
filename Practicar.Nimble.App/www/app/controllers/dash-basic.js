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
    $scope.FillMyTasks = function (dataMyTasks) {
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
                categories: dataMyTasks.categories  //['Outubro', 'Novembro', 'Dezembro']
            },
            yAxis: {
                min: 0,
                max: dataMyTasks.count,
                visible: false,
                title: {
                    text: 'Minhas Tarefas'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            legend: {
                reversed: true,
                margin: 0,
                shadow: false,
                verticalAlign: 'bottom',
                floating: false
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.x + '</b><br/>' +
                        this.series.name + ': ' + this.y + '<br/>' +
                        'Total: ' + this.point.stackTotal;
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                        style: {
                            textShadow: '0 0 3px black'
                        }
                    }
                }
            },
            series: [{
                name: 'Atrasada',
                color: '#FFB68E',
                data: [dataMyTasks.lastMonth.countDelayed, dataMyTasks.actualMonth.countDelayed, dataMyTasks.futureMonth.countDelayed]
            }, {
                name: 'Não Iniciada',
                color: '#EDED87',
                data: [dataMyTasks.lastMonth.countFuture, dataMyTasks.actualMonth.countFuture, dataMyTasks.futureMonth.countFuture]
            }, {
                name: 'Concluídas',
                color: '#BFE387',
                data: [dataMyTasks.lastMonth.countOK, dataMyTasks.actualMonth.countOK, dataMyTasks.futureMonth.countOK]
    
            }, {
                name: 'Iniciada',
                color: '#00447C',
                data: [dataMyTasks.lastMonth.countStarted, dataMyTasks.actualMonth.countStarted, dataMyTasks.futureMonth.countStarted]

            }]
        });
    };



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
        $scope.$broadcast('scroll.refreshComplete');
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

        dataMyTasks.categories.push(now.getMonth() - 1);
        dataMyTasks.categories.push(now.getMonth());
        dataMyTasks.categories.push(now.getMonth() + 1);

        angular.forEach(data, function (value) {
            value.AssignmentStartDate = new Date(parseInt(value.AssignmentStartDate.substr(6)));
            value.AssignmentFinishDate = new Date(parseInt(value.AssignmentFinishDate.substr(6)));
            //Last
            if ((value.AssignmentStartDate.getMonth() <= now.getMonth()-1 && value.AssignmentFinishDate.getMonth() >= now.getMonth()-1) || value.AssignmentStartDate.getMonth() == now.getMonth()-1 || value.AssignmentFinishDate.getMonth() == now.getMonth()-1) {

                if (value.AssignmentPercentWorkCompleted < 100 && value.AssignmentFinishDate < now) {
                    dataMyTasks.lastMonth.countDelayed++;
                }
                else if (value.AssignmentPercentWorkCompleted >= 100) {
                    dataMyTasks.lastMonth.countOK++;
                }
                else if (value.AssignmentPercentWorkCompleted == 0 && value.AssignmentStartDate > now) {
                    dataMyTasks.lastMonth.countFuture++;
                }
                else
                {
                    dataMyTasks.lastMonth.countStarted++;
                }
            }
            //Actual
            if ((value.AssignmentStartDate.getMonth() <= now.getMonth() && value.AssignmentFinishDate.getMonth() >= now.getMonth()) || value.AssignmentStartDate.getMonth() == now.getMonth() || value.AssignmentFinishDate.getMonth() == now.getMonth()) {

                if (value.AssignmentPercentWorkCompleted < 100 && value.AssignmentFinishDate < now) {
                    dataMyTasks.actualMonth.countDelayed++;
                }
                else if (value.AssignmentPercentWorkCompleted >= 100) {
                    dataMyTasks.actualMonth.countOK++;
                }
                else if (value.AssignmentPercentWorkCompleted == 0 && value.AssignmentStartDate > now) {
                    dataMyTasks.actualMonth.countFuture++;
                }
                else {
                    dataMyTasks.actualMonth.countStarted++;
                }
            }
            //future
            if ((value.AssignmentStartDate.getMonth() >= now.getMonth()+1 || value.AssignmentFinishDate.getMonth() >= now.getMonth()+1) ) {

                if (value.AssignmentPercentWorkCompleted < 100 && value.AssignmentFinishDate < now) {
                    dataMyTasks.futureMonth.countDelayed++;
                }
                else if (value.AssignmentPercentWorkCompleted >=100) {
                    dataMyTasks.futureMonth.countOK++;
                }
                else if (value.AssignmentPercentWorkCompleted == 0 && value.AssignmentStartDate > now) {
                    dataMyTasks.futureMonth.countFuture++;
                }
                else {
                    dataMyTasks.actualMonth.countStarted++;
                }
            }
        });
        $scope.FillMyTasks(dataMyTasks);
        $scope.dataMyTasks = dataMyTasks;
        $scope.$broadcast('scroll.refreshComplete');
    }).error(function (data) {
        var alertPopup = $ionicPopup.alert({
            title: 'Processamento inválido',
            template: data
        });
        $scope.$broadcast('scroll.refreshComplete');
    });


   
});