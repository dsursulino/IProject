var nimbleApp = angular.module('Nimble', [
  'ngRoute',
  'nimbleControllers'
]);

nimbleApp.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/', {
            templateUrl: 'Views/View-Inicial.html',
            controller: 'ControllerInicial'
        }).
        when('/Sobre', {
            templateUrl: 'Views/View-Sobre.html',
            controller: 'ControllerSobre'
        }).
        when('index.html', {
            templateUrl: 'index.html',
            controller: 'navBarInformacaoController'
         }).
        otherwise({
            redirectTo: '/',
            controller: 'navBarInformacaoController'

        });
  }]);


nimbleApp.run(['$rootScope', function ($rootScope) {
    var scope = Object.getPrototypeOf($rootScope);
    var old$Eval = scope.$eval;
    scope.$eval = function (expr, locals) {
        var that = this;
        if (window.MSApp) {
            return MSApp.execUnsafeLocalFunction(function () {
                return old$Eval.call(that, expr, locals);
            });
        } else {
            return old$Eval.call(that, expr, locals);
        }
    };
}]);


var nimbleControllers = angular.module('nimbleControllers', []);