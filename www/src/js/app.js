// Ionic Starter App
define('js/app', function (require, exports, module) {
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
  angular.module('starter', ['ionic'])

    .run(function($ionicPlatform,$rootScope, $state, $stateParams) {

      //$rootScope.$state = $state;
      //$rootScope.$stateParams = $stateParams;
      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
          StatusBar.styleLightContent();
        }
        document.addEventListener("deviceready", function() {
          if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
          }
          window.open = cordova.InAppBrowser.open;
        },false);
      });

    })

    .config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
      // Use x-www-form-urlencoded Content-Type
      //$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

      //$ionicConfigProvider.views.maxCache(10);
      // note that you can also chain configs
      $ionicConfigProvider.tabs.position('bottom');
      $ionicConfigProvider.navBar.alignTitle('center');
      //$ionicConfigProvider.views.swipeBackEnabled(false);
      $ionicConfigProvider.platform.ios.tabs.style('standard');
      $ionicConfigProvider.platform.ios.tabs.position('bottom');
      $ionicConfigProvider.platform.android.tabs.style('standard');
      $ionicConfigProvider.platform.android.tabs.position('bottom');
      $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
      $ionicConfigProvider.platform.android.navBar.alignTitle('center');
      $ionicConfigProvider.platform.ios.backButton.text('').icon('ion-ios-arrow-back');
      $ionicConfigProvider.platform.android.backButton.text('').icon('ion-ios-arrow-back');
      $ionicConfigProvider.backButton.text("");
      $ionicConfigProvider.platform.ios.views.transition('ios');
      $ionicConfigProvider.platform.android.views.transition('android');


    });
});
