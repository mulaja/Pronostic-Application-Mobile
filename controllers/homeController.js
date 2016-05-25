'use strict';

angular.module('module')
.controller('homeController', ['authentificationService', '$location', function (authentificationService, $location) {

    var homeCtrl = this;

    homeCtrl.isConnected = function(){
        return authentificationService.isConnected();
    };

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
    };

    homeCtrl.reglement = function () {
        $location.url('/reglement');
    };
    
    homeCtrl.login = function () {
        $location.url('/login');
    };
    
    homeCtrl.profil = function () {
        $location.url('/profil');
    };

}]);