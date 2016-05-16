'use strict';

angular.module('module')
.controller('rangController', ['$location','rangService', 'authentificationService', function ($location,rangService, authentificationService) {

    var rangCtrl = this;

    // Boolean pour determiner si l'utilisateur est connecté
    rangCtrl.isConnected = function () {
        return authentificationService.isConnected();
    };

    rangCtrl.home = function () {
        $location.url('/home');
    };

    // Algorithme de comparaison
    rangCtrl.compare = function (rang1, rang2) {

        // On compare le nombre de points
        if (rang1.points < rang2.points) {
            return false;
        }
        if (rang1.points == rang2.points) {
            // On compare le nombre de victoires
            if (rang1.winners < rang2.winners) {
                return false;
            }
            if (rang1.winners = rang2.winners) {
                // On compare le nombre de victoires
                if (rang1.scores < rang2.scores) {
                    return false;
                }
            }
        }
        return true;
    };

    // Algorithme de tri
    rangCtrl.tri = function (rangs, f) {
        for (var i = 0 ; i < rangs.length; i++) {
            // le tableau est trié de 0 à i-1
            // La boucle interne recherche le maximum  
            // de i+1 à la fin du tableau. 
            for (var j = i + 1; j < rangs.length; j++) {
                if (f(rangs[j], rangs[i])) {
                    var temp = rangs[j];
                    rangs[j] = rangs[i];
                    rangs[i] = temp;
                }
            }
        }
        return rangs;
    };

    rangCtrl.isMySelf = function (id) {
        return authentificationService.getUser().id == id;
    };

    document.addEventListener('deviceready', function () {

        // On récupère le classement
        if (rangCtrl.isConnected()) {

            rangCtrl.rangs = [];
            rangService.getRangs().then(function (rangs) {
                var classement = rangCtrl.tri(rangs, rangCtrl.compare);

                // On ajoute le rang
                var rang = 1;
                var points = classement[0].points;
                var winners = classement[0].winners;
                var scores = classement[0].scores;

                for (var i = 0; i < classement.length; i++) {

                    if (classement[i].points < points || classement[i].winners < winners || classement[i].scores < scores) {
                        rang++;
                    }

                    rangCtrl.rangs.push({ rang: rang, id: classement[i].id, pseudonyme: classement[i].pseudonyme, points: classement[i].points, winners: classement[i].winners, scores: classement[i].scores });

                    points = classement[i].points;
                    winners = classement[i].winners;
                    scores = classement[i].scores;

                }

            });
        }
    });

}]);