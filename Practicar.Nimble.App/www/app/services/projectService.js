angular.module('nimble.service.project', [])
.service('projectService', function ($http, $q, $localstorage) {

    this.getMyProjects = function () {

        var projectIds = [];
        var project;
        var deferred = $q.defer();
        var promise = deferred.promise;
        var oAuth = $localstorage.getObject("nimble.oAuth");

        var comand = oAuth.ProjectURL + "/_api/ProjectServer/Projects?$select=Id";

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
            async: false,
            data: oAuth.SecurityToken,
            headers: {
                Accept: "application/json;odata=verbose"
            },
            success: function (data) {
                try {
                    angular.forEach(data.d.results, function (value) {
                        this.push(value.Id);
                    }, projectIds);
                } catch (e) {
                    deferred.reject("Solicitação não realizada : " + e);
                }
            },
            error: function (result, textStatus, errorThrown, a, b) {
                result = angular.fromJson(result);
                var exeception = angular.fromJson(result.responseText);
                deferred.reject(exeception.error.message.value);
            }
        });


        comand = oAuth.ProjectURL + "/_api/ProjectData/[en-US]/Projects";
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
                    var results = [];
                    angular.forEach(data.d.results, function (value) {
                        if ($.inArray(value.ProjectId, projectIds) != -1) {
                            this.push(value);
                        }
                    }, results);

                    deferred.resolve(results);

                    
                } catch (e) {
                    deferred.reject("Solicitação não realizada : " + e);
                }

                return promise;
            },
            error: function (result, textStatus, errorThrown, a, b) {
                result = angular.fromJson(result);
                var exeception = angular.fromJson(result.responseText);
                deferred.reject(exeception.error.message.value);

                return promise;
            }
        });






        return promise;

    };



});