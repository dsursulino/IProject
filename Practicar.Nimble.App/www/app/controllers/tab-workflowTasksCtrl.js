﻿/// <reference path="spAuthService.js" />
angular.module('nimble.controllers.tabWorkflowTasks', [])

.controller('workflowTasksCtrl', function ($rootScope, $document, $timeout, $scope, $ionicSideMenuDelegate) {

    $scope.openRightMenu = function () {
        $ionicSideMenuDelegate.toggleRight();
    };


    var lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. " +
		          "Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor." +
		          "Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, " +
		          "ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor." +
		          "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

    $scope.events = [{
        badgeClass: 'info',
        badgeIconClass: 'glyphicon-check',
        title: 'First heading',
        when: '11 hours ago via Twitter',
        content: 'Some awesome content.'
    }
    , {
        badgeClass: 'default',
        badgeIconClass: 'glyphicon-credit-card',
        title: 'Third heading',
        titleContentHtml: '<img class="img-responsive" src="http://practicar.com.br/wp-content/uploads/2014/06/logo-practicar.png">',
        contentHtml: lorem,
        footerContentHtml: '<a href="">Continue Reading</a>'
    }
    , {
        badgeClass: 'warning',
        badgeIconClass: 'glyphicon-credit-card',
        title: 'Second heading',
        when: '12 hours ago via Twitter',
        content: 'More awesome content.'
    }, {
        badgeClass: 'default',
        badgeIconClass: 'glyphicon-credit-card',
        title: 'Third heading',
        titleContentHtml: '<img class="img-responsive" src="http://practicar.com.br/wp-content/uploads/2014/04/img-blog.png">',
        contentHtml: lorem,
        footerContentHtml: '<a href="">Continue Reading</a>'
    }];

    $scope.addEvent = function () {
        $scope.events.push({
            badgeClass: 'info',
            badgeIconClass: 'glyphicon-check',
            title: 'First heading',
            when: '3 hours ago via Twitter',
            content: 'Some awesome content.'
        });

    };
    // optional: not mandatory (uses angular-scroll-animate)
    $scope.animateElementIn = function ($el) {
        $el.removeClass('hidden');
        $el.addClass('bounce-in');
    };

    // optional: not mandatory (uses angular-scroll-animate)
    $scope.animateElementOut = function ($el) {
        $el.addClass('hidden');
        $el.removeClass('bounce-in');
    };
});