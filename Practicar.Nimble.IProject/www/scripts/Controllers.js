﻿var myAppControllers = angular.module('myAppControllers', []);


myAppControllers.controller('ControllerInicial', ['$scope', '$http',
  function ($scope, $http) {

      $scope.subTitulo = "DashBoard";

      $scope.menuList = [
          { 'url': '#Sobre', 'text': 'Sobre Nimble' },
      ];

      $http.get(
            'http://localhost:15117/Methods.asmx/HelloWorld')
          .success(function (data) {
              console.log(data);
              $scope.retorno = data.text;
        }
        )

      //$scope.retorno = ServiceHelloWorld.GetMsg("Exemplo de Entrada");

  }]);

myAppControllers.controller('ControllerSobre', ['$scope', '$routeParams',
    function ($scope, $routeParams) {


    }]);


