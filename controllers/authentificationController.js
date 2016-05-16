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
                .catch(function (message) {
                    authentificationCtrl.error = message;
                });
            }
        };

        authentificationCtrl.inscription = function () {
            $location.url('/create');
        };

        if (authentificationService.isConnected()) {
            $location.url('/home');
        }

    }]);