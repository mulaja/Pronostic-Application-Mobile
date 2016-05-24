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

                        listPronostics[date].push(response.data[i]);
                    }

                    // Cr�ation de l'objet complexe
                    for (var pronostic in listPronostics) {
                        listDates.push({ date: new Date(pronostic).getTime(), data: listPronostics[pronostic] });
                    }

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