'use strict';

angular.module('module')
.provider('pronosticService', function () {
    this.$get = function ($http) {
        return {
            urlListPronostics: serverRest+'/Prognosis',
            getListPronostics: function (idUser) {
                 return $http({ method: 'GET', url: this.urlListPronostics, params: { id_user: idUser } }).then(function (response) {

                    var listPronostics = [];
                    var listDates = [];

                    // Listes des pronostics
                    for (var i = 0; i < response.data.length; i++) {
                        var date = response.data[i].date.substring(0, response.data[i].date.indexOf('T'));

                        if (!listPronostics[date]) {
                            listPronostics[date] = [];
                        }

                        var time_full = response.data[i].date.substring(response.data[i].date.indexOf('T') +1,response.data[i].date.length-1);
                        var time = time_full.substring(0,time_full.lastIndexOf(":"));
                        response.data[i].time = time;

                        listPronostics[date].push(response.data[i]);
                    }

                    // Cr�ation de l'objet complexe
                    for (var pronostic in listPronostics) {
                        listDates.push({ date: new Date(pronostic).getTime(), data: listPronostics[pronostic] });
                    }

                    listDates.sort(function(a,b){
                            // Turn your strings into dates, and then subtract them
                            // to get a value that is either negative, positive, or zero.
                            return new Date(a.date) - new Date(b.date);
                     });   

                    return listDates;
                });
            },
            savePrognosis: function (pronostics) {
                return $http.post(this.urlListPronostics, pronostics).then(function (response) {
                    return response.data;
                }).catch(function(error){
                    return error.message;
                });

            }
        };
    };
});