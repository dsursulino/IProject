
angular.module('nimble.factory.spAuthFactory', [])
.factory('spAuthenticate', function ($http, $q, $localstorage) {



    var _oAuth = {
        "SecurityToken": null,
        "Promise": null,
        "DomainURL": null,
        "ProjectURL": null,
        "User": { "Login": null, "Password": null, "Profile": null },
        "IsAuthenticate": false,
        "Message": null
    };
    var oAuth = $localstorage.getObject("nimble.oAuth");
    var deferred;

    var authenticate = function (userId, password, url) {

        _oAuth.ProjectURL = url;
        pathArray = url.split('/');
        protocol = pathArray[0];
        host = pathArray[2];
        _oAuth.DomainURL = url = protocol + '//' + host;


        var signInurl = url + '/_forms/default.aspx?wa=wsignin1.0';
        deferred = $q.defer();
        var promise = deferred.promise;
        var xmlData = getSAMLRequest(userId, password, signInurl);
        $.support.cors = true; // enable cross-domain query
        promise.success = function (fn) {
            promise.then(fn);
            return promise;
        }
        promise.error = function (fn) {
            promise.then(null, fn);
            return promise;
        }


        $.ajax({
            type: 'POST',
            data: xmlData,
            crossDomain: true, // had no effect, see support.cors above   
            async: true,
            url: 'https://login.microsoftonline.com/extSTS.srf',
            dataType: 'xml',
            cache: true,
            success: function (data, textStatus, result) {

                deferred = getBearerToken(result.responseText, signInurl);


                if (deferred.promise.$$state.status == 1) {
                    _oAuth.IsAuthenticate = true;
                    _oAuth.User.Login = userId;
                    _oAuth.User.Password = password;

                    $.ajax({

                        method: 'GET',
                        //  url: _oAuth.ProjectURL + "/_api/SP.UserProfiles.PeopleManager/GetMyProperties",
                        url: _oAuth.ProjectURL + "/_api/Web/CurrentUser",

                        async: false,
                        data: _oAuth.SecurityToken,
                        headers: {
                            Accept: "application/json;odata=verbose"
                        },
                        success: function (data) {
                            data.d.Photo = _oAuth.ProjectURL + "/_layouts/15/userphoto.aspx?size=S&accountname=" + data.d.Email;
                            $.ajax({

                                method: 'GET',
                                url: _oAuth.ProjectURL + "/_api/ProjectData/[en-US]/Resources?$select=ResourceId&$filter=ResourceEmailAddress eq '" + data.d.Email + "'",
                                async: false,
                                data: _oAuth.SecurityToken,
                                headers: {
                                    Accept: "application/json;odata=verbose"
                                },
                                success: function (data2) {
                                    if (data2.d.results.length > 0)
                                        data.d.ResourceId = data2.d.results[0].ResourceId;
                                    else
                                        data.d.ResourceId = null;
                                }
                            });

                            _oAuth.User.Profile = data.d;
                        },
                        error: function (result, textStatus, errorThrown, a, b) {
                            result = angular.fromJson(result);
                            var exeception = angular.fromJson(result.responseText);
                            deferred.reject(exeception.error.message.value);
                        }
                    });
                }

                _oAuth.Message = deferred.promise.$$state.value;



                oAuth = _oAuth;


                $localstorage.setObject("nimble.oAuth", _oAuth);





                return promise;

            },
            error: function (result, textStatus, errorThrown) {

                deferred.reject("Solicitação de Autenticação inválida: " + textStatus);

                return promise;
            }
        });



        return promise;

    };


    function getExecuteREST(comand, async) {
        oAuth = $localstorage.getObject("nimble.oAuth");
        deferred = $q.defer();
        var promise = deferred.promise;
        if (async == null) {
            async = false;
        }

        $.ajax({

            method: 'GET',
            url: comand,
            async: async,
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

    }
    function getSAMLRequest(userID, password, url) {
        return '<s:Envelope \
                        xmlns:s="http://www.w3.org/2003/05/soap-envelope" \
                        xmlns:a="http://www.w3.org/2005/08/addressing" \
                        xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd"> \
                        <s:Header> \
                            <a:Action s:mustUnderstand="1">http://schemas.xmlsoap.org/ws/2005/02/trust/RST/Issue</a:Action> \
                            <a:ReplyTo> \
                                <a:Address>http://www.w3.org/2005/08/addressing/anonymous</a:Address> \
                            </a:ReplyTo> \
                            <a:To s:mustUnderstand="1">https://login.microsoftonline.com/extSTS.srf</a:To> \
                            <o:Security \
                                s:mustUnderstand="1" \
                                xmlns:o="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd"> \
                                <o:UsernameToken> \
                                    <o:Username>' + userID + '</o:Username> \
                                    <o:Password>' + password + '</o:Password> \
                                </o:UsernameToken> \
                            </o:Security> \
                        </s:Header> \
                        <s:Body> \
                            <t:RequestSecurityToken xmlns:t="http://schemas.xmlsoap.org/ws/2005/02/trust"> \
                                <wsp:AppliesTo xmlns:wsp="http://schemas.xmlsoap.org/ws/2004/09/policy"> \
                                    <a:EndpointReference> \
                                        <a:Address>' + url + '</a:Address> \
                                    </a:EndpointReference> \
                                </wsp:AppliesTo> \
                                <t:KeyType>http://schemas.xmlsoap.org/ws/2005/05/identity/NoProofKey</t:KeyType> \
                                <t:RequestType>http://schemas.xmlsoap.org/ws/2005/02/trust/Issue</t:RequestType> \
                                <t:TokenType>urn:oasis:names:tc:SAML:1.0:assertion</t:TokenType> \
                            </t:RequestSecurityToken> \
                        </s:Body> \
                    </s:Envelope> \
                    ';
    }

    function getBearerToken(result, url) {


        if (ionic.Platform.isWindowsPhone())
            oAuth.SecurityToken = $.parseXML(result).all[18].textContent;
        else
            oAuth.SecurityToken = $($.parseXML(result)).find("BinarySecurityToken").text();

        if (oAuth.SecurityToken.length == 0) {
            deferred.reject("Token de segurança do office 365 inválido.");
        }
        else {

            $.support.cors = true;
            $.ajax({
                type: 'POST',
                crossDomain: true,
                url: url,
                async: false,
                data: oAuth.SecurityToken,
                cache: true,
                headers: {
                    Accept: "application/json;odata=verbose"
                },
                success: function (data, textStatus, result) {
                    refreshDigestViaREST();
                    deferred.resolve("Sucesso");
                },
                error: function (result, textStatus, errorThrown) {
                    deferred.reject("Autenticação inválida: " + textStatus);
                }
            });

        }

        return deferred;
    }

    function refreshDigestViaREST() {

        var appUrl = "file:///android_asset/www/index.html";

        var url = oAuth.ProjectURL.replace("https", "http");




        var xhr = new XMLHttpRequest();
        var open_str = url + '/_api/contextinfo';
        xhr.open("POST", open_str, true);
        xhr.setRequestHeader("Content-Type", "application/json;odata=verbose");
        //  xhr.setRequestHeader("Accept", "application/json;odata=verbose");
        xhr.setRequestHeader("Content-length", "0");
        xhr.withCredentials = false;
        xhr.onload = function () {
            var responseText = xhr.responseText;
            console.log(responseText);
            // process the response.
        };

        xhr.onerror = function () {
            console.log('There was an error!');
        };
        xhr.onreadystatechange = function () {

            if (xhr.readyState == 4 && xhr.status == 200) {

                var digest = $(xhr.responseText).find("d\\:FormDigestValue").text();

                alert(digest);

            }
        }
        xhr.send(null);


        ////  $.support.cors = true;
        //  $.ajax({
        //      url: url + '/_api/contextinfo',
        //      type: "POST",
        //  //    crossDomain: true,
        //      data: oAuth.SecurityToken,
        //      contentType: 'application/json',
        //      cache: true,
        //      header: {
        //          // "withCredentials": true,
        //          Accept: "application/json;odata=verbose",
        //          Connection: "keep-alive",
        //          Location: oAuth.ProjectURL,
        //          Origin: null
        //      },
        //      success: function (data) {
        //          if (data.d) {
        //              var webUrl = data.d.GetContextWebInformation.WebFullUrl;

        //              //var clientContext = new SP.ClientContext(webUrl);
        //          }
        //      },
        //      error: function (err) {
        //          alert(JSON.stringify(err));
        //      }
        //  }
        //  );



        //$.support.cors = true; // enable cross-domain query
        //$.ajax({
        //    type: 'POST',
        //    data: oAuth.SecurityToken,
        //    crossDomain: true, // had no effect, see support.cors above
        //  //  contentType: 'text/xml; charset="utf-8"',
        //   // url: oAuth.ProjectURL + '/_api/contextinfo',
        //    url: oAuth.ProjectURL + '/_api/search/postquery',
        //   // dataType: 'application/json;odata=verbose',
        //    body: {},
        //    header : {
        //        "Accept": "application/json; odata=verbose",
        //        "Content-Length": 0
        //    },
        //    success: function (data, textStatus, result) {
        //        var teste = result;

        //        //digest = $(result.responseText).find("d\\:FormDigestValue").text();

        //    },
        //    error: function (result, textStatus, errorThrown) {
        //        var response = errorThrown;
        //    }
        //});




    }

    function refreshDigestViaWS() {
        $.support.cors = true; // enable cross-domain query
        $.ajax({
            type: 'POST',
            async: false,
            data: oAuth.SecurityToken,
            crossDomain: true, // had no effect, see support.cors above
            contentType: 'text/xml; charset="utf-8"',
            url: oAuth.ProjectURL + '/_vti_bin/sites.asmx',
            headers: {
                'SOAPAction': 'http://schemas.microsoft.com/sharepoint/soap/GetUpdatedFormDigestInformation',
                'X-RequestForceAuthentication': true
            },
            dataType: 'xml',
            success: function (data, textStatus, result) {

                var t = textStatus;

            },
            error: function (result, textStatus, errorThrown) {

                var teste = errorThrown;

            }
        });
    }

    function getProfile() {


        getExecuteREST(oAuth.DomainURL + "/_api/SP.UserProfiles.PeopleManager/GetMyProperties", true).success(function (data) {
            oAuth.User.Profile = data;
        }).error(function (data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Acesso negado ao perfil.',
                template: data
            });
        });

    };

    function IsAuthenticate() {
        if (oAuth != null) {
            if (oAuth.IsAuthenticate) {
                $.ajax({

                    method: 'GET',
                    url: oAuth.DomainURL + "/_api/SP.UserProfiles.PeopleManager/GetMyProperties",
                    async: false,
                    data: oAuth.SecurityToken,
                    headers: {
                        Accept: "application/json;odata=verbose"
                    },
                    success: function (data) {
                        oAuth.User.Profile = data.d;
                        return true;
                    },
                    error: function (result, textStatus, errorThrown, a, b) {
                        return false;
                    }
                });
            }
            return false;
        }
        return false;
    };
    return {
        authenticate: authenticate,
        get: getExecuteREST,
        oAuth: function () { return $localstorage.getObject("nimble.oAuth") },
        IsAuthenticate: IsAuthenticate
    };

});