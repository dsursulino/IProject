// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic',
                                    'ngSanitize',
                                    'ui.router',
                                    'angular-timeline',
                                    'angular-scroll-animate',
                                    'nimble.factory.utils',
                                    'nimble.factory.spAuthFactory',
                                    'nimble.directives',
                                    'nimble.filters',
                                    'nimble.service.assignment',
                                    'nimble.controllers.Menu',
                                    'nimble.controllers.Login',
                                    'nimble.controllers.tabProjects',
                                    'nimble.controllers.tabAssignments',
                                    'nimble.controllers.tabWorkflowTasks'
])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    .state('about', {
        url: "/about",
        templateUrl: "about.html"

    })
    .state('login', {
        url: '/login',
        templateUrl: 'app/views/auth/login.html',
        controller: 'LoginCtrl'
    })


     // setup an abstract state for the tabs directive
    .state('startTabs', {
        url: '/startTabs',
        abstract: true,
        templateUrl: 'app/views/start-tabs/tab-master.html'
    })


    .state('startTabs.projects', {
        url: '/projects',
        views: {
            'tab-projects': {
                templateUrl: 'app/views/start-tabs/tab-projects.html',
                controller: 'tabProjectsCtrl'
            }
        }
    })

    .state('startTabs.assignments', {
        url: '/assignments',
        views: {
            'tab-assignments': {
                templateUrl: 'app/views/start-tabs/tab-assignments.html',
                controller: 'tabAssignmentsCtrl'
            }
        }
    })

    .state('startTabs.workflowTasks', {
        url: '/workflowTasks',
        views: {
            'tab-workflowTasks': {
                templateUrl: 'app/views/start-tabs/tab-workflowTasks.html',
                controller: 'workflowTasksCtrl'
            }
        }
    });

    //.state('tab.chat-detail', {
    //    url: '/chats/:chatId',
    //    views: {
    //        'tab-chats': {
    //            templateUrl: 'templates/chat-detail.html',
    //            controller: 'ChatDetailCtrl'
    //        }
    //    }
    //});



    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('login');

});
