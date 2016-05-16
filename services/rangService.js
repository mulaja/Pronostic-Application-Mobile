'use strict';

angular.module('module')
.provider('rangService', function () {
    this.$get = function ($http) {
        return {
            urlListRangs: 'http://mulaja.esy.es/rest.php/Rangs',
            getRangs: function () {
                return $http.get(this.urlListRangs).then(function (response) {
                    return response.data;
                });
            }
        };
    };
});