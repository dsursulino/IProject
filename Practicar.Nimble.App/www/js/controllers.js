/// <reference path="spAuthService.js" />
angular.module('starter.controllers', [])

.directive('repeatDone', function () {
    return function (scope, element, attrs) {
        if (scope.$last) { // all are rendered
            scope.$eval(attrs.repeatDone);
        }
    }
})

.controller('LoginCtrl', function ($scope, $state, $ionicPopup, spAuthenticate) {

    $scope.data = {};

    $scope.oAuth = {};

    $scope.signIn = function () {

        $scope.data.domain = 'https://practicarcloud.sharepoint.com/PWA',
        $scope.data.username = 'dursulino@practicar.com.br',
        $scope.data.password = 'j9x7a2q2!';

        spAuthenticate.authenticate($scope.data.username, $scope.data.password, $scope.data.domain).success(function (data) {
            $state.go('tab.dash');
        }).error(function (data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Acesso negado',
                template: data
            });
        });



    };
})

.controller('DashCtrl', function ($scope, $state, $ionicSideMenuDelegate, $ionicPopup, $timeout, spAuthenticate) {
    $scope.openMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };
    $scope.openRightMenu = function () {
        $ionicSideMenuDelegate.toggleRight();
        $scope.User = spAuthenticate.oAuth.User.Profile;
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
            $("[name='pie-percentComplete']").easyPieChart({
                lineWidth: 9,
                barColor: '#7dc6ec',
                trackColor: '#e5e9ec',
                scaleColor: false,
                size: 70
            });
        }, 0);

    };
    $scope.GetProjects = function () {

        spAuthenticate.get('https://practicarcloud.sharepoint.com/pwa/_api/ProjectData/[en-US]/Projects', true).success(function (data) {
            $scope.Projects = data.results;
        }).error(function (data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Processamento inválido',
                template: data
            });
        });



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

    $scope.chats = Chats.all();
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

    $scope.oi = function () {
        var alertPopup = $ionicPopup.alert({
            title: 'foi',
            template: oi
        });
    };

    $scope.User = spAuthenticate.oAuth.User.Profile;
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
