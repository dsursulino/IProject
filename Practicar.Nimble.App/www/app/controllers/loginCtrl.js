/// <reference path="spAuthService.js" />
angular.module('nimble.controllers.Login', [])

.controller('LoginCtrl', function ($scope, $state, $ionicPopup, $ionicLoading, spAuthenticate) {

    //$scope.VerifyAuthenticate = function VerifyAuthenticate() {
    //    if (spAuthenticate.IsAuthenticate()) {
    //        $state.go('tab.dash');
    //    }
    //};


    $scope.data = {};
    
    $scope.signIn = function (dataForm) {
        var data = $scope.data;
        if (dataForm.$valid) {
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });

            if (data.domain == 'debug') {
                $scope.data.domain = 'https://practicarcloud.sharepoint.com/PWA',
                $scope.data.username = 'jtorres@practicar.com.br',
                $scope.data.password = 'P@$$w0rd';
            }
            if (data.domain == 'debug2') {
                $scope.data.domain = 'https://practicarcloud.sharepoint.com/sites/PWA',
                $scope.data.username = 'dursulino@practicar.com.br',
                $scope.data.password = 'j9x7a2q2!';
            }
            if (data.domain == 'debug3') {
                $scope.data.domain = 'https://practicarcloud.sharepoint.com/sites/PWA',
                $scope.data.username = 'nsilva@practicar.com.br',
                $scope.data.password = 'nick.260595';
            }
            if (data.domain == 'debug4') {
                $scope.data.domain = 'https://lockengenharia.sharepoint.com/sites/PWA',
                $scope.data.username = 'leilla.silva@lockengenharia.onmicrosoft.com',
                $scope.data.password = 'Lock1234@';
            }
            if (data.domain == null || data.username == null || data.password == null) {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                    title: 'Acesso negado',
                    template: 'Verifique os dados de acesso.'
                });
            }
            else {

                spAuthenticate.authenticate(data.username, data.password, data.domain).success(function (data) {
                    $("#imgProfileUser").attr("src", spAuthenticate.oAuth().User.Profile.Photo);
                     angular.element(document.getElementById('menuDefaultRight')).scope().Load(); //BUG
                    $state.go('dashBasic');
                    $ionicLoading.hide();

                }).error(function (data) {
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: 'Acesso negado',
                        template: data
                    });
                });

            }
        }
    };

})
