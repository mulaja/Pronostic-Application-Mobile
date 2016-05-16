'use strict';

angular.module('module')
.controller('homeController', ['authentificationService', '$location', function (authentificationService, $location) {

    var homeCtrl = this;

    homeCtrl.calendrier = function () {
        $location.url('/calendar');
    };

    homeCtrl.pronostics = function () {
        $location.url('/pronostic');
    };

    homeCtrl.classement = function () {
        $location.url('/classement');
    };

    homeCtrl.deconnexion = function () {

        authentificationService.setUser(null);
        $location.url('/login');
    };

    homeCtrl.reglement = function () {
        $location.url('/reglement');
    };

}]);