/// <reference path="spAuthService.js" />
angular.module('nimble.controllers.Login', [])

.controller('LoginCtrl', function ($scope, $state, $ionicPopup, $ionicLoading, spAuthenticate) {

    $scope.VerifyAuthenticate = function VerifyAuthenticate() {
        if (spAuthenticate.IsAuthenticate()) {
            $state.go('tab.dash');
        }
    };



    $scope.data = {};

    $scope.oAuth = spAuthenticate.oAuth;

    $scope.signIn = function () {

        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

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
        if ($scope.data.domain == null || $scope.data.username == null || $scope.data.password == null) {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
                title: 'Acesso negado',
                template: 'Verifique os dados de acesso.'
            });
        }
        else {

            spAuthenticate.authenticate($scope.data.username, $scope.data.password, $scope.data.domain).success(function (data) {
                $("#imgProfileUser").attr("src", spAuthenticate.oAuth().User.Profile.Photo);
                //angular.element(document.getElementById('menuDefaultRight')).scope().$apply();
                angular.element(document.getElementById('menuDefaultRight')).scope().Load(); //BUG
                $state.go('startTabs.projects');
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
