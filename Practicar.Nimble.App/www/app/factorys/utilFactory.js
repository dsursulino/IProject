angular.module('nimble.factory.utils', [])

.factory('$localstorage', ['$window', function ($window) {
    return {
        set: function (key, value) {
            $window.localStorage[key] = value;
        },
        get: function (key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        setObject: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function (key) {
            return JSON.parse($window.localStorage[key] || '{}');
        }
    }
}])
.factory('$crypto',function() {
    var Key = CryptoJS.enc.Utf8.parse("8080808080808080");
    var IV = CryptoJS.enc.Utf8.parse("8080808080808080");

    return {
        encrypt: function (value) {
            return CryptoJS.AES.encrypt(value, Key, { iv: IV, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString();
        },
        decrypt: function (value) {
            return CryptoJS.AES.decrypt(encryptedTextvalue, Key, { iv: IV, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString(CryptoJS.enc.Utf8);
        }
    }
});