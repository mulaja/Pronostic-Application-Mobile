'use strict';

angular.module('module')
.service('authentificationService', function () {
    return {
        user: null,
        getUser: function () {
            this.user = angular.fromJson(localStorage.authentificationService);
            return this.user;
        },
        setUser: function (newUser) {
            this.user = newUser;
            localStorage.authentificationService = angular.toJson(this.user);
        },
        isConnected: function () {
            this.user = angular.fromJson(localStorage.authentificationService);
            return !!this.user;
        },
		submitLogin : function(utilisateur) {
			return $http({ method: 'POST', url: 'http://mulaja.esy.es/rest.php/Login', params: utilisateur })
                .then(function (response) {
					return response.data;
                })
                .catch(function (error) {
					return error.data.message;
                });
		}
    };
});