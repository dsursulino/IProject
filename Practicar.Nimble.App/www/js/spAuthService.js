
angular.module('starter.spAuthService', [])
.factory('spAuthenticate', function ($http, $q) {
    var oAuth = {
        "SecurityToken": null,
        "Promise": null,
        "DomainUrl": null,
        "IsValid": false,
        "Message": null
    };
    var authenticate = function (userId, password, url) {

        pathArray = url.split('/');
        protocol = pathArray[0];
        host = pathArray[2];
        oAuth.DomainUrl = url = protocol + '//' + host;

        var signInurl = url + '/_forms/default.aspx?wa=wsignin1.0';
        var deferred = $q.defer();
        var message = getSAMLRequest(userId, password, signInurl);
        $.support.cors = true; // enable cross-domain query
        $.ajax({
            type: 'POST',
            data: message,
            crossDomain: true, // had no effect, see support.cors above   
            async: false,
            url: 'https://login.microsoftonline.com/extSTS.srf',
            dataType: "xml",
            success: function (data, textStatus, result) {

                deferred = getBearerToken(result.responseText, signInurl);

            },
            error: function (result, textStatus, errorThrown) {
                deferred.reject("Solicitação de Autenticação inválida: " + textStatus);
            }
        });

        if (deferred.promise.$$state.status == 1)
            oAuth.IsValid = true;

        oAuth.Message = deferred.promise.$$state.value;


        return oAuth;
    };

    return {
        authenticate: authenticate
    };

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

        var deferred = $q.defer();

        var securityToken = oAuth.SecurityToken = $($.parseXML(result)).find("BinarySecurityToken").text();

        if (securityToken.length == 0) {
            deferred.reject("Token de segurança do office 365 inválido.");
        }
        else {


            $.ajax({
                type: 'POST',
                method: 'POST',
                url: url,
                async: false,
                data: securityToken,
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



            $.ajax({

                method: 'GET',
                url: 'https://practicarcloud.sharepoint.com/pwa/_api/ProjectData/Projetos',
                async: false,
                data: securityToken,
                headers: {
                    Accept: "application/json;odata=verbose"
                },
                success: function (data) {
                    var ao = data;
                },
                error: function (result, textStatus, errorThrown) {
                    deferred.reject("Autenticação inválida: " + textStatus);
                }
            });
        }

        return deferred;
    }
});