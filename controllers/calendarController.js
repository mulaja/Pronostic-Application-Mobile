'use strict';

angular.module('module')
.controller('calendarController', ['$location','calendarService', 'authentificationService', function ($location,calendarService, authentificationService) {

    var calendarCtrl = this;
    calendarCtrl.loading = true;
    
    // Boolean pour determiner si l'utilisateur est connect�
    calendarCtrl.isConnected = function () {
        return authentificationService.isConnected();
    };

    calendarCtrl.home = function () {
        $location.url('/home');
    };

    document.addEventListener('deviceready', function () {

        // On r�cup�re la liste des matchs
        calendarService.getListFixtures().then(function (fixtures) {
            calendarCtrl.fixtures = fixtures;
            calendarCtrl.loading = false;
        });
    });
}]);