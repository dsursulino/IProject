
var O365Auth;
(function (O365Auth) {
    (function (Settings) {
        Settings.clientId = 'd8a2ebe7-180c-49f4-91bf-650e324bb105';
        Settings.authUri = 'https://login.microsoftonline.com/common/';
        Settings.redirectUri = 'http://localhost:4400/services/office365/redirectTarget.html';
        Settings.domain = 'practicar.com.br';
    })(O365Auth.Settings || (O365Auth.Settings = {}));
    var Settings = O365Auth.Settings;
})(O365Auth || (O365Auth = {}));
