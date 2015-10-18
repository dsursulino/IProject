// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397705
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
var Practicar;
(function (Practicar) {
    var Nimble;
    (function (Nimble) {
        var IProject;
        (function (IProject) {
            var Ionic;
            (function (Ionic) {
                "use strict";
                var Application;
                (function (Application) {
                    function initialize() {
                        document.addEventListener('deviceready', onDeviceReady, false);
                    }
                    Application.initialize = initialize;
                    function onDeviceReady() {
                        // Handle the Cordova pause and resume events
                        document.addEventListener('pause', onPause, false);
                        document.addEventListener('resume', onResume, false);
                        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
                    }
                    function onPause() {
                        // TODO: This application has been suspended. Save application state here.
                    }
                    function onResume() {
                        // TODO: This application has been reactivated. Restore application state here.
                    }
                })(Application = Ionic.Application || (Ionic.Application = {}));
                window.onload = function () {
                    Application.initialize();
                };
            })(Ionic = IProject.Ionic || (IProject.Ionic = {}));
        })(IProject = Nimble.IProject || (Nimble.IProject = {}));
    })(Nimble = Practicar.Nimble || (Practicar.Nimble = {}));
})(Practicar || (Practicar = {}));
//# sourceMappingURL=appBundle.js.map