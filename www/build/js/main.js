/**
 * Created by zhouzixing on 2016-06-25.
 */

define('route',function(require, exports, module) {

  angular.module('starter').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: G.tpl + 'tabs.html'
    })

    // Each tab has its own nav history stack:

    .state('tab.grow', {
      url: '/grow',
      views: {
        'tab-dash': {
          templateUrl: G.tpl + 'tab-grow.html',
          controller: 'GrowCtrl'
        }
      }
    })
    .state('tab.events', {
      url: '/events',
      views: {
        'tab-chats': {
          templateUrl: G.tpl + 'tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.task', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: G.tpl + 'chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })
    .state('tab.discover', {
      url: '/discover',
      views: {
        'tab-account': {
          templateUrl: G.tpl + 'tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    })
    .state('tab.setting', {
      url: '/setting',
      views: {
        'tab-chats': {
          templateUrl: G.tpl + 'chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/grow');


  }]);
});

define('controllers', function (require, exports, module) {
  angular.module('starter')

  .controller('DashCtrl', function ($scope) {
  })
  .controller('GrowCtrl', function ($scope) {
  })
  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
})

define('indexCtrl', function (require, exports, module) {

	angular.module('starter')
    .controller('IndexCtrl', function($scope, $ionicHistory, WServer, $state, $ionicPopup,$rootScope){



        G.file = {};
        $scope.G = G;
        initDate();
        $scope.goBack = function(){
            $ionicHistory.goBack();

        };

        function initDate(){

          $rootScope.index = {};
          var userInfo = {
            remain_money: 0
          };

          if (G.devMode) {
              userInfo = {
              };
          }
          store.set("userInfo", store.get("userInfo") || userInfo);
            WServer.get(G.url.getAdImages,{}, function(data){
                $scope.index.imgList = data.rows;
            });
        }



    });


});

define('service', ['ionic'], function (require, exports, module) {
  angular.module('starter')

  .factory('Chats', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
      id: 0,
      name: 'Ben Sparrow',
      lastText: 'You on your way?',
      face: 'img/ben.png'
    }, {
      id: 1,
      name: 'Max Lynx',
      lastText: 'Hey, it\'s me',
      face: 'img/max.png'
    }, {
      id: 2,
      name: 'Adam Bradleyson',
      lastText: 'I should buy a boat',
      face: 'img/adam.jpg'
    }, {
      id: 3,
      name: 'Perry Governor',
      lastText: 'Look at my mukluks!',
      face: 'img/perry.png'
    }, {
      id: 4,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/mike.png'
    }];

    return {
      all: function () {
        return chats;
      },
      remove: function (chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function (chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      }
    };
  });
})

// Ionic Starter App
define('app', function (require, exports, module) {
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


define('api',function(require, exports, module) {
    var host = G.host;
    var host2 = G.host2;

    var domain = host+ "action/";
    G.url = {
        "clientId": "c1ebe466-1cdc-4bd3-ab69-77c3561b9dee",
        "clientSecret": "d8346ea2-6017-43ed-ad68-19c0f971738b",

      // 支付调用ping++ 时候使用
        "app_id" : "app_0qrnvT9uPan50aPS",

        login : domain + 'student/studentLogin.action',
        getCode: domain + 'student/getMobileSendMsg.action',
        sendCode: domain + 'student/getMobileCodeResult.action',
        insertStudent: domain + 'student/insertStudent',
        checkStudent: domain + "student/checkStudent.action",
        updateStudent: domain + "student/updateStudent.action",

        getAdImages : domain + 'publicImage/getAppImages.action',
        getChargeList : domain + 'charge/selectChargeList',
        chargeSubmit : domain + 'charge/appChargeMoney.action',

        insertMaintain: domain + 'maintain/insertMaintain',

        getSchoolList: domain + 'school/selectSchoolList',
        getMarjorList: domain + 'school/selectMarjorBySCId',
        getMarjorDetail: domain + 'school/appSelectMajorById.action',


        zl_request : host2 + 'httpI.action',
    };
});



seajs.use(['ionic','ngCordova','ngIOS9UIWebViewPatch','store','api','app','service','indexCtrl','controllers','route'

],function(){
});

