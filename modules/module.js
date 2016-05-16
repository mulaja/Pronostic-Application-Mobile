'use strict';

angular.module('module', ['ngRoute', 'ngCordova', 'mobile-angular-ui', 'mobile-angular-ui.gestures'])

.config(function ($routeProvider) {

    $routeProvider.when('/login', {
        templateUrl: 'views/login.html',
        controller: 'authentificationController',
        controllerAs: 'authentificationCtrl'
    });

    $routeProvider.when('/create', {
        templateUrl: 'views/create_user.html',
        controller: 'userController',
        controllerAs: 'userCtrl'
    });

    $routeProvider.when('/home', {
        templateUrl: 'views/menu.html',
        controller: 'homeController',
        controllerAs: 'homeCtrl'
    });

    $routeProvider.when('/calendar', {
        templateUrl: 'views/calendrier.html',
        controller: 'calendarController',
        controllerAs: 'calendarCtrl'
    });

    $routeProvider.when('/pronostic', {
        templateUrl: 'views/pronostic.html',
        controller: 'pronosticController',
        controllerAs: 'pronosticCtrl'
    });

    $routeProvider.when('/classement', {
        templateUrl: 'views/classement.html',
        controller: 'rangController',
        controllerAs: 'rangCtrl'
    });

    $routeProvider.when('/reglement', {
        templateUrl: 'views/reglement.html'
    });

    $routeProvider.otherwise({
        redirectTo: '/login'
    });
});