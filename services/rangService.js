'use strict';

angular.module('module')
.provider('rangService', function () {
    this.$get = function ($http) {
        return {
            urlListRangs: serverRest+'/Rangs',
            getRangs: function () {
               return $http.get(this.urlListRangs).then(function (response) {
                    return response.data;
                }).catch(function(error){
                    return error.message;
                });
            }
        };
    };
});