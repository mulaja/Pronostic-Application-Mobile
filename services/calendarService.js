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

                        var time_full = response.data[i].date.substring(response.data[i].date.indexOf('T') +1,response.data[i].date.length-1);
                        var time = time_full.substring(0,time_full.lastIndexOf(":"));
                        response.data[i].time = time;
                        
                        listFixtures[date].push(response.data[i]);
                    }

                    // Cr�ation de l'objet complexe
                    for (var fixture in listFixtures) {
                        listDates.push({ date: new Date(fixture).getTime(), data: listFixtures[fixture] });
                    }
                    
                    listDates.sort(function(a,b){
                            // Turn your strings into dates, and then subtract them
                            // to get a value that is either negative, positive, or zero.
                            return new Date(a.date) - new Date(b.date);
                     });       


                    return listDates;
                });
            }
        };
    };
});