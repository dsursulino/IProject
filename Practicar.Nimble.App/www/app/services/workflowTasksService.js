angular.module('nimble.service.workflowTasks', [])
.service('workflowTasksService', function ($http, $q, $localstorage) {

    this.Exists = function () {


        var oAuth = $localstorage.getObject("nimble.oAuth");
        var deferred = $q.defer();
        var promise = deferred.promise;

        var comand = oAuth.ProjectURL + "/_api/web/lists?$filter=EntityTypeName eq 'WorkflowTasks'&$select=Id";


        promise.success = function (fn) {
            promise.then(fn);
            return promise;
        }
        promise.error = function (fn) {
            promise.then(null, fn);
            return promise;
        }



        $.ajax({

            method: 'GET',
            url: comand,
            async: true,
            data: oAuth.SecurityToken,
            headers: {
                Accept: "application/json;odata=verbose"
            },
            success: function (data) {
                try {
                    if (data.d.results.length > 0) {
                        deferred.resolve(data.d.results[0].Id);
                    }
                    else {
                        deferred.reject("A Lista de Tarefas do Fluxo de Trabalho do Project Server não existe.");
                    }

                    oAuth.Message = deferred.promise.$$state.value;

                } catch (e) {
                    deferred.reject("Solicitação não realizada : " + e);
                    oAuth.Message = deferred.promise.$$state.value;
                }
                return promise;
            },
            error: function (result, textStatus, errorThrown) {
                result = angular.fromJson(result);
                var exeception = angular.fromJson(result.responseText);
                deferred.reject(exeception.error.message.value);
                oAuth.Message = deferred.promise.$$state.value;

                return promise;
            }
        });



        return promise;

    };

    this.getAll = function (listID) {


        var oAuth = $localstorage.getObject("nimble.oAuth");
        var deferred = $q.defer();
        var promise = deferred.promise;

        var comand = oAuth.ProjectURL + "/_api/web/lists(guid'" + listID + "')/Items";


        promise.success = function (fn) {
            promise.then(fn);
            return promise;
        }
        promise.error = function (fn) {
            promise.then(null, fn);
            return promise;
        }



        $.ajax({

            method: 'GET',
            url: comand,
            async: true,
            data: oAuth.SecurityToken,
            headers: {
                Accept: "application/json;odata=verbose"
            },
            success: function (data) {
                try {

                    deferred.resolve(data.d.results);

                    oAuth.Message = deferred.promise.$$state.value;

                } catch (e) {
                    deferred.reject("Solicitação não realizada : " + e);
                    oAuth.Message = deferred.promise.$$state.value;
                }
                return promise;
            },
            error: function (result, textStatus, errorThrown) {
                result = angular.fromJson(result);
                var exeception = angular.fromJson(result.responseText);
                deferred.reject(exeception.error.message.value);
                oAuth.Message = deferred.promise.$$state.value;

                return promise;
            }
        });



        return promise;

    };

    this.getAllOwner = function (listID) {


        var oAuth = $localstorage.getObject("nimble.oAuth");
        var deferred = $q.defer();
        var promise = deferred.promise;

        var comand = oAuth.ProjectURL + "/_api/web/lists(guid'" + listID + "')/Items?$filter= AssignedToId eq " + oAuth.User.Profile.Id;

      

        promise.success = function (fn) {
            promise.then(fn);
            return promise;
        }
        promise.error = function (fn) {
            promise.then(null, fn);
            return promise;
        }



        $.ajax({

            method: 'GET',
            url: comand,
            async: true,
            data: oAuth.SecurityToken,
            headers: {
                Accept: "application/json;odata=verbose"
            },
            success: function (data) {
                try {

                    deferred.resolve(data.d.results);

                    oAuth.Message = deferred.promise.$$state.value;

                } catch (e) {
                    deferred.reject("Solicitação não realizada : " + e);
                    oAuth.Message = deferred.promise.$$state.value;
                }
                return promise;
            },
            error: function (result, textStatus, errorThrown) {
                result = angular.fromJson(result);
                var exeception = angular.fromJson(result.responseText);
                deferred.reject(exeception.error.message.value);
                oAuth.Message = deferred.promise.$$state.value;

                return promise;
            }
        });



        return promise;

    };

});