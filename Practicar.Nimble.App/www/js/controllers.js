angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope, $state, $ionicSideMenuDelegate) {
    $scope.openMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };
    $scope.openRightMenu = function () {
        $ionicSideMenuDelegate.toggleRight();
    };

    $scope.close = function () {
        $state.go('tab.dash');
    };

    $scope.AuthenticateResult = "";

    $scope.signIn = function () {


        //var SP = '',
        //site = 'http://practicarcloud.sharepoint.com',
        //username = 'dursulino@practicar.com.br',
        //password = 'j9x7a2q2!';

        //var result = spAuthenticate.authenticate(username, password, site);


        // $scope.AuthenticateResult = result.Message;
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
});
