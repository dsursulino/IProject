﻿(function () {
    'use strict';

    angular.module('app365').controller('signInCtrl', ['$scope', '$state', 'app365api', signInCtrl]);

    function signInCtrl($scope, $state, app365api) {

        $scope.signIn = function () {
            alert('oi');
            app365api.login(onlogin);            
        };

        var onlogin = function (reason) {
            if (typeof reason == 'undefined') {
                // Navigate to contact list page when sign-in was successful.
                $state.go('app.contact');
            }
        };
    }
})();