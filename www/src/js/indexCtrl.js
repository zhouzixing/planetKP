define('js/indexCtrl', function (require, exports, module) {

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
