'use strict';

angular.module('module')
.provider('profilService', function () {
    this.$get = function ($http) {
        return {
            urlProfil : serverRest+'/Profil',
            getProfil: function (idUser) {
                return $http.get(this.urlProfil+'/'+idUser).then(function (response) {
                    return response.data;
                });
            }
        };
    }
});