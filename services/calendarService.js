'use strict';

angular.module('module')
.provider('calendarService', function () {
    this.$get = function ($http, $rootScope) {
        $rootScope.header = true;
        return {
            urlListFixtures: serverRest+'/Match',
            
            getListFixtures: function () {

                return $http({ method: 'GET', url: this.urlListFixtures}).then(function (response) {

                    var listFixtures = [];
                    var listDates = [];

                    // Listes des matchs
                    for (var i = 0; i < response.data.length; i++) {
                        var date = response.data[i].date.substring(0, response.data[i].date.indexOf('T'));
                        if (!listFixtures[date]) {
                            listFixtures[date] = [];
                        }

                        listFixtures[date].push(response.data[i]);
                    }

                    // Cr�ation de l'objet complexe
                    for (var fixture in listFixtures) {
                        listDates.push({ date: new Date(fixture).getTime(), data: listFixtures[fixture] });
                    }

                    return listDates;
                });
            }
        };
    };
});