'use strict';

angular.module('module')
.controller('pronosticController', ['$location','pronosticService', 'authentificationService', function ($location,pronosticService, authentificationService) {

    var pronosticCtrl = this;

    // Boolean pour determiner si l'utilisateur est connecté
    pronosticCtrl.isConnected = function () {
        return authentificationService.isConnected();
    };

    pronosticCtrl.home = function () {
        $location.url('/home');
    };

    // Fonction pour sauvegerder les pronostics
    pronosticCtrl.savePrognosis = function (pronostic) {

        var pronostics = [];

        for (var i = 0; i < pronostic.length; i++) {
            if (pronostic[i].goalsAwayTeam && pronostic[i].goalsHomeTeam) {
                pronostics.push({ id_match: pronostic[i].idMatch, goalsAwayTeam: pronostic[i].goalsAwayTeam, goalsHomeTeam: pronostic[i].goalsHomeTeam });
            }
        }

        if (pronostics.length > 0) {
            pronosticService.savePrognosis({ id_user: authentificationService.getUser().id, pronostics: pronostics }).then(function (message) {

                message.unchange > 0 ? pronosticCtrl.class = "warning" : pronosticCtrl.class = "success";

                pronosticCtrl.message = message.change + " modification";
                if (message.change > 1) {
                    pronosticCtrl.message += "s";
                }

                if (message.unchange == 1) {
                    pronosticCtrl.message += " et 1 annulation";
                }

                if (message.unchange > 1) {
                    pronosticCtrl.message += " et " + message.unchange + " annulations";
                }

            }).catch(function (message) {
                pronosticCtrl.class = "warning";
                pronosticCtrl.message = message.message;
            });
        }
    };

    document.addEventListener('deviceready', function () {

        // On récupère les pronostics
        if (pronosticCtrl.isConnected()) {
            pronosticService.getListPronostics(authentificationService.getUser().id).then(function (pronostics) {
                pronosticCtrl.pronostics = pronostics;
            });
        }

    });

}]);