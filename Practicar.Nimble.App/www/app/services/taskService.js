angular.module('nimble.service.task', [])
.service('taskService', function ($http, $q, $localstorage) {

    this.getAssigneds = function (taskID) {


        var oAuth = $localstorage.getObject("nimble.oAuth");
        var deferred = $q.defer();
        var promise = deferred.promise;
        var comand = oAuth.ProjectURL + "/_api/ProjectData/[en-US]/Assignments?$filter=(TaskId eq guid'" + taskID + "'and AssignmentPercentWorkCompleted lt 100)&$orderby=AssignmentStartDate";
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
                    deferred.resolve(data.d);
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

        oAuth.Message = deferred.promise.$$state.value;


        promise.success = function (fn) {
            promise.then(fn);
            return promise;
        }
        promise.error = function (fn) {
            promise.then(null, fn);
            return promise;
        }



        return promise;

    };



});