var myApp = angular.module('Nimble', [
  'ngRoute',
  'myAppControllers'
]);

myApp.config(['$routeProvider',
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
        otherwise({
            redirectTo: '/'
        });
  }]);


myApp.run(['$rootScope', function ($rootScope) {
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
