
angular.module('starter.spAuthFactory', [])
.factory('spAuthenticate', function ($http, $q, $localstorage) {



    var _oAuth = {
        "SecurityToken": null,
        "Promise": null,
        "DomainURL": null,
        "ProjectURL": null,
        "User": { "Login": null, "Password": null },
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
        $.ajax({
            type: 'POST',
            data: xmlData,
            crossDomain: true, // had no effect, see support.cors above   
            async: false,
            url: 'https://login.microsoftonline.com/extSTS.srf',
            dataType: 'xml',
            success: function (data, textStatus, result) {

                deferred = getBearerToken(result.responseText, signInurl);

            },
            error: function (result, textStatus, errorThrown) {
                deferred.reject("Solicitação de Autenticação inválida: " + textStatus);
            }
        });

        if (deferred.promise.$$state.status == 1)
            _oAuth.IsAuthenticate = true;

        _oAuth.Message = deferred.promise.$$state.value;


        promise.success = function (fn) {
            promise.then(fn);
            return promise;
        }
        promise.error = function (fn) {
            promise.then(null, fn);
            return promise;
        }
        oAuth = _oAuth
        $localstorage.setObject("nimble.oAuth", _oAuth);

        return promise;

    };


    function getExecuteREST(comand, async) {
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
            error: function (result, textStatus, errorThrown) {
                deferred.reject("Solicitação inválida: " + textStatus);
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


            $.ajax({
                type: 'POST',
                method: 'POST',
                url: url,
                async: false,
                data: oAuth.SecurityToken,
                headers: {
                    Accept: "application/json;odata=verbose"
                },
                success: function (data, textStatus, result) {
                    deferred.resolve("Sucesso");
                },
                error: function (result, textStatus, errorThrown) {
                    deferred.reject("Autenticação inválida: " + textStatus);
                }
            });

        }

        return deferred;
    }

    return {
        authenticate: authenticate,
        get: getExecuteREST,
        oAuth: $localstorage.getObject("nimble.oAuth")
    };

});