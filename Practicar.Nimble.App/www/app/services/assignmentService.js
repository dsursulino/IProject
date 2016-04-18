/// <reference path="../../lib/office/PS.js" />
/// <reference path="../../lib/office/SP.js" />
/// <reference path="../../lib/office/sp.requestexecutor.js" />

angular.module('nimble.service.assignment', [])
.service('assignmentService', function ($http, $q, $localstorage, $filter) {

    this.get = function (id) {


        var oAuth = $localstorage.getObject("nimble.oAuth");
        var deferred = $q.defer();
        var promise = deferred.promise;

        promise.success = function (fn) {
            promise.then(fn);
            return promise;
        }
        promise.error = function (fn) {
            promise.then(null, fn);
            return promise;
        }


        var comand = oAuth.ProjectURL + "/_api/ProjectData/[en-US]/Assignments?$filter=AssignmentId eq guid'" + id + "'";;




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
                    deferred.resolve(data.d.results[0]);

                } catch (e) {
                    deferred.reject("Solicitação não realizada : " + e);
                }
                oAuth.Message = deferred.promise.$$state.value;
                return promise;
            },
            error: function (result, textStatus, errorThrown, a, b) {
                result = angular.fromJson(result);
                var exeception = angular.fromJson(result.responseText);
                deferred.reject(exeception.error.message.value);
                oAuth.Message = deferred.promise.$$state.value;

                return promise;
            }
        });





        return promise;

    };

    this.getOwner = function () {


        var oAuth = $localstorage.getObject("nimble.oAuth");
        var deferred = $q.defer();
        var promise = deferred.promise;


        promise.success = function (fn) {
            promise.then(fn);
            return promise;
        }
        promise.error = function (fn) {
            promise.then(null, fn);
            return promise;
        }

        if (oAuth.User.Profile.ResourceId == null) {
            deferred.reject("Você não possui tarefas, pois não esta associado a lista de recursos do Project Server.");
            return deferred;
        }
            var comand = oAuth.ProjectURL + "/_api/ProjectData/[en-US]/Assignments?$filter=ResourceId eq guid'" + oAuth.User.Profile.ResourceId + "' and AssignmentPercentWorkCompleted lt 100  &$orderby=AssignmentStartDate";

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
                    deferred.resolve(data.d);

                } catch (e) {
                    deferred.reject("Solicitação não realizada : " + e);
                }
                oAuth.Message = deferred.promise.$$state.value;
                return deferred;
            },
            error: function (result, textStatus, errorThrown, a, b) {
                result = angular.fromJson(result);
                var exeception = angular.fromJson(result.responseText);
                deferred.reject(exeception.error.message.value);
                oAuth.Message = deferred.promise.$$state.value;
                return deferred;
            }
        });






        return promise;

    };

    this.getAssigneds = function (taskID) {


        var oAuth = $localstorage.getObject("nimble.oAuth");
        var deferred = $q.defer();
        var promise = deferred.promise;
        var comand = oAuth.ProjectURL + "/_api/ProjectData/[en-US]/Assignments?$filter=TaskId eq guid'" + taskID + "' &$orderby=AssignmentStartDate";
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

    this.getAssignedsCount = function (taskID) {


        var oAuth = $localstorage.getObject("nimble.oAuth");
        var deferred = $q.defer();
        var promise = deferred.promise;
        var comand = oAuth.ProjectURL + "/_api/ProjectData/[en-US]/Assignments/$count/?$filter=(TaskId eq guid'" + taskID + "' )&$orderby=AssignmentStartDate";
        $.ajax({

            method: 'GET',
            url: comand,
            async: false,
            data: oAuth.SecurityToken,
            //headers: {
            //    Accept: "application/json;odata=verbose"
            //},
            success: function (data) {
                try {
                    deferred.resolve(data);
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

    this.getAssignedsLasted = function () {


        var oAuth = $localstorage.getObject("nimble.oAuth");
        var deferred = $q.defer();
        var promise = deferred.promise;




        promise.success = function (fn) {
            promise.then(fn);
            return promise;
        }
        promise.error = function (fn) {
            promise.then(null, fn);
            return promise;
        }


        var dateStart = new Date();
        dateStart.setMonth(dateStart.getMonth() - 1);

        var dateFinish = new Date();
        dateFinish.setMonth(dateFinish.getMonth() + 1);

        dateStart = $filter('date')(dateStart, 'yyyy-MM-dd') + "T00:00:00.00Z";

        dateFinish = $filter('date')(dateFinish, 'yyyy-MM-dd') + "T00:00:00.00Z";


        var comand = oAuth.ProjectURL + "/_api/ProjectData/[en-US]/Assignments?$filter=ResourceId eq guid'" + oAuth.User.Profile.ResourceId;
        comand += "' and (AssignmentStartDate ge datetime'" + dateStart + "' or AssignmentFinishDate ge datetime'" + dateStart + "')";
        comand += " and (AssignmentStartDate le datetime'" + dateFinish + "' or AssignmentFinishDate le datetime'" + dateFinish + "')";




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

                } catch (e) {
                    deferred.reject("Solicitação não realizada : " + e);
                }
                oAuth.Message = deferred.promise.$$state.value;
                return promise;
            },
            error: function (result, textStatus, errorThrown, a, b) {
                result = angular.fromJson(result);
                var exeception = angular.fromJson(result.responseText);
                deferred.reject(exeception.error.message.value);
                oAuth.Message = deferred.promise.$$state.value;

                return promise;
            }
        });





        return promise;

    };

    this.update = function (assingment) {


        var oAuth = $localstorage.getObject("nimble.oAuth");
        var deferred = $q.defer();
        var promise = deferred.promise;



        promise.success = function (fn) {
            promise.then(fn);
            return promise;
        };
        promise.error = function (fn) {
            promise.then(null, fn);
            return promise;
        };



        //$.support.cors = true; // enable cross-domain query
        //$.ajax({
        //    type: 'POST',
        //    data: oAuth.SecurityToken,
        //    crossDomain: true, // had no effect, see support.cors above
        //    contentType: 'text/xml; charset="utf-8"',
        //    url: oAuth.ProjectURL + '/_vti_bin/sites.asmx',
        //    headers: {
        //        'SOAPAction': 'http://schemas.microsoft.com/sharepoint/soap/GetUpdatedFormDigestInformation',
        //        'X-RequestForceAuthentication': 'true'
        //    },
        //    dataType: 'xml',
        //    success: function (data, textStatus, result) {
        //        digest = $(result.responseXML).find("DigestValue").text();
        //        //     sendRESTReq();
        //    },
        //    error: function (result, textStatus, errorThrown) {
        //        var response = JSON.parse(result.responseText);
        //        if ((response.error != undefined) && (response.error.message != undefined)) {
        //            alert(response.error.message.value);
        //        }
        //    }
        //});






        //    var projContext = new PS.ProjectContext(oAuth.ProjectURL);

        //var factory = new SP.ProxyWebRequestExecutorFactory(oAuth.ProjectURL);

        //projContext.set_webRequestExecutorFactory(factory);

        //var appContextSite = new SP.AppContextSite(projContext, oAuth.ProjectURL);

        //var executor = new SP.RequestExecutor(oAuth.ProjectURL);





        //var assingmentContext = projContext.get_enterpriseResources().getByGuid(oAuth.User.Profile.ResourceId).get_assignments().getByGuid(assingment.AssignmentId);



        var factory;
        var appContextSite;
        var collList;
        var url = window.location.href;
        //Get the client context of the AppWebUrl
        context = new SP.ClientContext(oAuth.ProjectURL);
        //Get the ProxyWebRequestExecutorFactory
        factory = new SP.ProxyWebRequestExecutorFactory(oAuth.ProjectURL);
        //Assign the factory to the client context.
        context.set_webRequestExecutorFactory(factory);
        //Get the app context of the Host Web using the client context of the Application.
        appContextSite = new SP.AppContextSite(context, oAuth.ProjectURL);
        //Get the Web
        this.web = appContextSite.get_web();
        //Load Web.
        context.load(this.web);



        //      projContext.load(assingmentContext);

        context.executeQueryAsync(function () {


            var nome = assingmentContext.get_name();
            var percentual = assingmentContext.get_percentComplete();

            assingmentContext.set_percentComplete(assingment.AssignmentPercentWorkCompleted);
            assingmentContext.submitStatusUpdates("Nimble: " + assingment.AssignmentComment);

            //projContext.get_enterpriseResources().getByGuid(oAuth.User.Profile.ResourceId).get_assignments().update();

            //projContext.executeQueryAsync(function () {
            //    deferred.resolve('Atualizado com sucesso.');
            //}, function (error) {
            //    deferred.reject("Não foi possível atualizar a tarefa . ");
            //});

        }, function (er, a) {
            deferred.reject("Tarefa não encontrada. Tente novamente. :" + a.get_message());
        });





        return promise;

    }

});