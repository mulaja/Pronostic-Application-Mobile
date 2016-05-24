'use strict';

angular.module('module')
.service('authentificationService', function ($http) {
    return {
        urlLogin : serverRest+'/Login',
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
			return $http({ method: 'POST', url: this.urlLogin, params: utilisateur })
                .then(function (response) {
					return response.data;
                })
                .catch(function (error) {
					return error.data.message;
                });
		}
    };
});