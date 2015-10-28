/// <reference path="spAuthService.js" />
angular.module('starter.controllers', [])

.directive('repeatDone', function () {
    return function (scope, element, attrs) {
        if (scope.$last) { // all are rendered
            scope.$eval(attrs.repeatDone);
        }
    }
})

.controller('LoginCtrl', function ($scope, $state, $ionicPopup, $ionicLoading, spAuthenticate) {

    $scope.VerifyAuthenticate = function VerifyAuthenticate() {
        if (spAuthenticate.IsAuthenticate()) {
            $state.go('tab.dash');
        }
    };



    $scope.data = {};

    $scope.oAuth = spAuthenticate.oAuth;

    $scope.signIn = function () {

        if ($scope.data.domain == 'debug') {
            $scope.data.domain = 'https://practicarcloud.sharepoint.com/PWA',
            $scope.data.username = 'jtorres@practicar.com.br',
            $scope.data.password = 'e%kmrtcr66';
        }
        if ($scope.data.domain == 'debug2') {
            $scope.data.domain = 'https://practicarcloud.sharepoint.com/sites/PWA',
            $scope.data.username = 'dursulino@practicar.com.br',
            $scope.data.password = 'j9x7a2q2!';
        }
        if ($scope.data.domain == null || $scope.data.domain == null || $scope.data.domain == null) {
            var alertPopup = $ionicPopup.alert({
                title: 'Acesso negado',
                template: 'Verifique os dados de acesso.'
            });
        }
        else {
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            spAuthenticate.authenticate($scope.data.username, $scope.data.password, $scope.data.domain).success(function (data) {
                $("#imgProfileUser").attr("src", spAuthenticate.oAuth().User.Profile.Photo);
                //angular.element(document.getElementById('menuDefaultRight')).scope().$apply();
                angular.element(document.getElementById('menuDefaultRight')).scope().Load();
                $state.go('tab.dash');
                $ionicLoading.hide();

            }).error(function (data) {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                    title: 'Acesso negado',
                    template: data
                });
            });

        }

    };

})

.controller('DashCtrl', function ($scope, $state, $ionicSideMenuDelegate, $ionicPopup, $timeout, spAuthenticate) {
    $scope.openMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };
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
                var spi = (parseFloat($(this).attr("data-spi"))*100);
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
        }).error(function (data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Processamento inválido',
                template: data
            });
        });

        $scope.$broadcast('scroll.refreshComplete');

    };
})

.controller('ChatsCtrl', function ($scope, Chats, $ionicSideMenuDelegate) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    $scope.openMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };
    $scope.openRightMenu = function () {
        $ionicSideMenuDelegate.toggleRight();
    };

    //$scope.chats = Chats.all();
    $scope.remove = function (chat) {
        Chats.remove(chat);
    };
})

.controller('menuCtrl', function ($scope, $state, $ionicSideMenuDelegate, $ionicPopup, $timeout, spAuthenticate) {
    $scope.openMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };
    $scope.openRightMenu = function () {
        $ionicSideMenuDelegate.toggleRight();
    };

    $scope.Load = function () {
        $scope.User = spAuthenticate.oAuth().User.Profile;
    };

    $scope.User = spAuthenticate.oAuth().User.Profile;



})

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function ($scope, $ionicSideMenuDelegate) {
    $scope.openMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };
    $scope.openRightMenu = function () {
        $ionicSideMenuDelegate.toggleRight();
    };

    $scope.settings = {
        enableFriends: true
    };
})
.filter('cmdate', [
    '$filter', function ($filter) {
        return function (input, format) {
            var date = new Date(parseInt(input.substr(6)));
            return $filter('date')(date, format);
        };
    }
]);
