'use strict';

angular.module('module')
.controller('authentificationController', ['$location', '$http', 'authentificationService',
    function ($location, $http, authentificationService) {

        var authentificationCtrl = this;

        authentificationCtrl.submitLogin = function () {

            if (authentificationCtrl.loginForm.$valid) {

                var utilisateur = { pseudonyme: authentificationCtrl.user.pseudonyme, password: calcMD5(authentificationCtrl.user.password) };

                authentificationService.submitLogin(utilisateur).then(function (utilisateur) {
                    authentificationService.setUser(utilisateur);
                    $location.url('/home');
                })
                .catch(function (error) {
                    authentificationCtrl.error = error.data.message;
                });
            }
        };

        authentificationCtrl.inscription = function () {
            $location.url('/create');
        };

    }]);