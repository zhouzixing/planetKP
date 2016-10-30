define('js/service', ['ionic'], function (require, exports, module) {
  angular.module('starter')
    .service('WServer', ['$http','$cacheFactory', '$ionicPopup', function ($http,$cacheFactory,$ionicPopup) {
      // ajax 的jsonp 请求
      this.get = function(url, params, cb, errFun) {
        //$.ajax({
        //  timeout: 2000 * 1000,
        //  url: url,
        //  type: "get",
        //  data: params,
        //  dataType: "jsonp",
        //  contentType: "application/x-www-form-urlencoded; charset=utf-8",
        //  beforeSend: function(xhr, settings) {
        //  },
        //  success: function(response, textStatus, jqXHR) {
        //    if (response.success == "true" || response.errCode == "0" || angular.isArray(response)) {
        //      if (angular.isFunction(cb)) {
        //        cb(response);
        //      }
        //    } else {
        //      if (angular.isFunction(errFun)) {
        //        errFun();
        //      }else {
        //        $ionicPopup.alert({
        //          title: '正蓝e管家',
        //          template: "<div class='alert-info'>" + (response.errMsg || url + "请求失败！")+"</div>"
        //        });
        //      }
        //    }
        //
        //  },
        //  error: function(response, xhr, type) {
        //  },
        //  complete: function(xhr, status) {
        //  }
        //});
      };


      /**
       * 简单的请求 不是output格式返回
       * @param url
       * @param params
       * @param cb
       * @param errFun
       */
      this.request = function(url, params, cb, errFun) {
        var paramsStr = parseParam(params);
        var reqUrl = url + "?callback=JSON_CALLBACK&" + paramsStr + "&stamp=" + new Date().getTime();
        $http.jsonp(reqUrl)
          .success(function (response, status, headers, config) {
            if (angular.isFunction(cb)) {
              cb(response);
            }
          });
      };
      function parseParam(param, key){
        var paramStr="";
        if(param instanceof String||param instanceof Number||param instanceof Boolean){
          paramStr += "&"+key+"=" + encodeURIComponent(param);
        }else{
          $.each(param,function(i){
            var k= !key? i : key+(param instanceof Array?"["+i+"]":"."+i);
            paramStr +='&'+ parseParam(this, k);
          });
        }
        return paramStr.substr(1);
      }
      this.getNow = function(){
        return new Date();
      };
      this.getDate = function(date) {
        if (!date){
          date = this.getNow();
        }
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var weekday = date.getDate();
        if (month < 10) {
          month = "0" + month;
        }
        if (weekday < 10) {
          weekday = "0" + weekday;
        }
        return year  + "-" + month + "-" + weekday;
      };

    }])
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
