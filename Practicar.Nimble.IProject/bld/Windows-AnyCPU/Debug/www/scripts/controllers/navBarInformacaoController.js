
nimbleControllers.controller('navBarInformacaoController', ['$scope', 
  function ($scope) {
     
      $scope.ProjetosDestacadas = [
          { 'Nome': 'Projeto Nimble 01', 'PercentualRealizado': 10, 'DataInicio': '', 'DataTermino': ''},
          { 'Nome': 'Projeto Nimble 02', 'PercentualRealizado': 20, 'DataInicio': '', 'DataTermino': ''},
          { 'Nome': 'Projeto Nimble 03', 'PercentualRealizado': 30, 'DataInicio': '', 'DataTermino': '' }];


      $scope.AtribuicoesDestacadas = [
          { 'Nome': 'Tarefa 01', 'PercentualRealizado': 50, 'DataInicio': '', 'DataTermino': '' },
          { 'Nome': 'Tarefa 02', 'PercentualRealizado': 20, 'DataInicio': '', 'DataTermino': '' },
          { 'Nome': 'Tarefa 03', 'PercentualRealizado': 93, 'DataInicio': '', 'DataTermino': '' }];

     // $scope.init = function () { };
    


  }]

 );