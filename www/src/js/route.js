/**
 * Created by zhouzixing on 2016-06-25.
 */

define('js/route',function(require, exports, module) {

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
    .state('tab.scoreSummary', {
      url: '/scoreSummary',
      views: {
        'tab-scoreSummary': {
          templateUrl: G.tpl + 'tab-scoreSummary.html',
          controller: 'ScoreSummaryCtrl'
        }
      }
    })
    .state('tab.studyState', {
      url: '/studyState',
      views: {
        'tab-studyState': {
          templateUrl: G.tpl + 'tab-studyState.html',
          controller: 'StudyStateCtrl'
        }
      }
    })
    .state('tab.parentGuid', {
      url: '/parentGuid',
      views: {
        'tab-parentGuid': {
          templateUrl: G.tpl + 'tab-parentGuid.html',
          controller: 'ParentGuidCtrl'
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
    $urlRouterProvider.otherwise('/tab/scoreSummary');


  }]);
});
