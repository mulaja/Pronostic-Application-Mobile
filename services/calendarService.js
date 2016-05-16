'use strict';

angular.module('module')
.provider('calendarService', function () {
    this.$get = function ($http, $rootScope) {
        $rootScope.header = true;
        return {
            urlSoccerseasonsEuropeanChampionships: 'http://api.football-data.org/v1/soccerseasons/424',
            headers: { headers: { 'X-Auth-Token': 'c704e31943a3421f99e72eb5b6c4fdc6' }, method: 'GET' },
            getListFixtures: function () {

                var headers = this.headers;
                headers.url = this.urlSoccerseasonsEuropeanChampionships + '/fixtures';

                return $http(this.headers).then(function (response) {

                    var listFixtures = [];
                    var listDates = [];

                    // Listes des matchs
                    for (var i = 0; i < response.data.fixtures.length; i++) {
                        var date = response.data.fixtures[i].date.substring(0, response.data.fixtures[i].date.indexOf('T'));
                        if (!listFixtures[date]) {
                            listFixtures[date] = [];
                        }

                        listFixtures[date].push(response.data.fixtures[i]);
                    }

                    // Création de l'objet complexe
                    for (var fixture in listFixtures) {
                        listDates.push({ date: new Date(fixture).getTime(), data: listFixtures[fixture] });
                    }

                    return listDates;
                });
            }
        };
    };
});