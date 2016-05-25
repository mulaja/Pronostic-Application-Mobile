'use strict';

angular.module('module')
.controller('profilController', ['$location', 'profilService', 'authentificationService', function ($location, profilService, authentificationService) {

    var profilCtrl = this;
    
    profilCtrl.isConnected = function () {
        return authentificationService.isConnected();
    };
      
    // On r�cup�re le profil
    if (profilCtrl.isConnected()) {
        profilService.getProfil(authentificationService.getUser().id).then(function (profil) {
            profilCtrl.profil = profil.user;
            profilCtrl.listAvatar = profil.listAvatar;
        });
    }
    
     document.addEventListener('deviceready', function () {

        // On r�cup�re les pronostics
       if (profilCtrl.isConnected()) {
            profilService.getProfil(authentificationService.getUser().id).then(function (profil) {
                profilCtrl.profil = profil.user;
                var listAvatar = profil.listAvatar;
                for(var i=0; i<listAvatar.length; i++ ){
                    if( profilCtrl.profil.id_avatar == listAvatar[i].id_avatar){
                        profilCtrl.profil.path = listAvatar[i].path;
                    }
                }
                
            });
        }else{
            $location.url('/home');
        }

    });



}]);