/// <reference path="spAuthService.js" />
angular.module('nimble.controllers.dashboardBasic', [])

.controller('dashboardBasicCtrl', function ($rootScope, $state, $timeout, $scope, $ionicSideMenuDelegate, $ionicPopup, projectService) {


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
                color: '#DF5353',
                data: [dataMyprojects.countDelayed]
            }, {
                name: 'Em Risco',
                color: '#DDDF0D',
                data: [dataMyprojects.countInRisk]
            }, {
                name: 'No Prazo',
                color: '#55BF3B',
                data: [dataMyprojects.countOK]
            }]
        });
    };
    $scope.FillMyTasks = function (dataMyTasks) {
        $('#divMyTasks').highcharts({
            chart: {
                type: 'column',
                backgroundColor: 'transparent',
                shadow: false
            },
            exporting: { enabled: false },
            title: {
                text: ''
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: ['Outubro', 'Novembro', 'Dezembro']
            },
            yAxis: {
                min: 0,
                max:11,
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
                name: 'Atrasao',
                color: '#DF5353',
                data: [5, 3, 4]
            }, {
                name: 'Em Risco',
                color: '#DDDF0D',
                data: [2, 2, 3]
            }, {
                name: 'No Prazo',
                color: '#55BF3B',
                data: [3, 4, 4]
            }]
        });
    };

    $scope.FillMyTasks(null);

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


});