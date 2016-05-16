'use strict';

angular.module('module')
.controller('calendarController', ['$location','calendarService', 'authentificationService', function ($location,calendarService, authentificationService) {

    var calendarCtrl = this;

    // Boolean pour determiner si l'utilisateur est connecté
    calendarCtrl.isConnected = function () {
        return authentificationService.isConnected();
    };

    calendarCtrl.home = function () {
        $location.url('/home');
    };

    document.addEventListener('deviceready', function () {

        // On récupère la liste des matchs
        calendarService.getListFixtures().then(function (fixtures) {
            calendarCtrl.fixtures = fixtures;
        });
    });
}]);