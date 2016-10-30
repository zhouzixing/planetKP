
var G = (function(root){
  return {
    root: root,
    imgs : root + "/img/",
    tpl : root + "/templates/",
    lang : 'zh-cn',
    //host: 'http://120.26.66.38:8080/WPay/',
    host: 'http://127.0.0.1:8080/planetKService/',
    version:"1.0.0",
    charset : "utf-8",
    devMode: false,
    phoneGap: false
  }
})('src');

seajs.config({

  debug:1,//加载器debug开关，本地缓存开关
  base : "./" ,

  //文件映射
  map: [
    //可配置版本号
    ['.css', '.css?v=' + G.version],
    ['.js', '.js?v=' + G.version]
  ],
  preload : [
    window.$ || window.jQuery ? '' :'jquery'
  ],
  paths: {
    js: G.root + "/js",
  },

  alias: {
    'ionic': 'lib/ionic/js/ionic.bundle',
    'ngIOS9UIWebViewPatch':'lib/angular-ios9-uiwebview.patch.js',
    'jquery': 'lib/jquery-latest.js',
    'ngCordova': 'lib/ng-cordova.min.js',
    'store': 'lib/store'
    //'cordovaPush': "lib/PushNotification.js",
  },

  // 文件编码
  charset: G.charset
});
