//var myAppControllers = angular.module('myAppControllers', []);


nimbleControllers.controller('ControllerInicial', ['$scope', '$http',
  function ($scope, $http) {

      $scope.subTitulo = "DashBoard";

      $scope.menuList = [
          { 'url': '#Sobre', 'text': 'Sobre Nimble' },
      ];





      $(".tile").height($("#tile1").width());
      $(".carousel").height($("#tile1").width());
      $(".item").height($("#tile1").width());

      $(window).resize(function () {
          if (this.resizeTO) clearTimeout(this.resizeTO);
          this.resizeTO = setTimeout(function () {
              $(this).trigger('resizeEnd');
          }, 10);
      });

      $(window).bind('resizeEnd', function () {
          $(".tile").height($("#tile1").width());
          $(".carousel").height($("#tile1").width());
          $(".item").height($("#tile1").width());
      });


      $http.get(
            'http://localhost:15117/Methods.asmx/HelloWorld')
          .success(function (data) {
              console.log(data);
              $scope.retorno = data.text;
          }
        )

      //$scope.retorno = ServiceHelloWorld.GetMsg("Exemplo de Entrada");

  }]

 );

nimbleControllers.controller('ControllerSobre', ['$scope', '$routeParams',
    function ($scope, $routeParams) {


    }]);


