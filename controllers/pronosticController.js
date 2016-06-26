'use strict';

angular.module('module')
.controller('pronosticController', ['$location','pronosticService', 'authentificationService', function ($location,pronosticService, authentificationService) {

    var pronosticCtrl = this;
    pronosticCtrl.loading = true;

    // Boolean pour determiner si l'utilisateur est connect�
    pronosticCtrl.isConnected = function () {
        return authentificationService.isConnected();
    };

    // Fonction pour sauvegerder les pronostics
    pronosticCtrl.savePrognosis = function (pronostic) {

        var pronostics = [];
        var validate = true;
        
        for (var i = 0; i < pronostic.length; i++) {
            if (pronostic[i].goalsAwayTeam && pronostic[i].goalsHomeTeam) {
                
                if( parseInt(pronostic[i].matchday) > 3  ){
                    var homeWinner = document.getElementById(pronostic[i].idMatch+'-home').checked;
                    var awayWinner = document.getElementById(pronostic[i].idMatch+'-away').checked;
                    
                    if( (homeWinner && !awayWinner) || (!homeWinner && awayWinner)){
                        pronostics.push({ id_match: pronostic[i].idMatch, goalsAwayTeam: pronostic[i].goalsAwayTeam, goalsHomeTeam: pronostic[i].goalsHomeTeam, winner : homeWinner ? pronostic[i].homeTeamName : pronostic[i].awayTeamName });
                    }else{
                        calendarCtrl.class = "alert alert-warning fade in";
                        calendarCtrl.message = " Vous devez choisir un vainqueur";
                        validate = false;
                    }
                }else{
                    pronostics.push({ id_match: pronostic[i].idMatch, goalsAwayTeam: pronostic[i].goalsAwayTeam, goalsHomeTeam: pronostic[i].goalsHomeTeam});
                }
            }
        }

        if (pronostics.length > 0 && validate) {
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

        // On r�cup�re les pronostics
        if (pronosticCtrl.isConnected()) {
            pronosticService.getListPronostics(authentificationService.getUser().id).then(function (pronostics) {
                pronosticCtrl.pronostics = pronostics;
                
                 pronosticCtrl.checklist = [];
                // Initialisation des check-box
                for(var i=0; i < pronostics.length; i++){
                    for(var j=0; j< pronostics[i].data.length ; j++){
                        if( pronostics[i].data[j].winner == pronostics[i].data[j].homeTeamName){
                            pronosticCtrl.checklist[pronostics[i].data[j].idMatch+'-home']=true;
                        }
                        
                        if(pronostics[i].data[j].winner == pronostics[i].data[j].awayTeamName){
                            pronosticCtrl.checklist[pronostics[i].data[j].idMatch+'-away']=true;
                        }
                    }
                }
                
                pronosticCtrl.loading = false;
            });
        }else{
            $location.url('/home');
        }

    });

}]);