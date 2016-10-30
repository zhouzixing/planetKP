/*!
 * gulp
 * $ npm install gulp-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache --save-dev
 */
// Load plugins
var gulp = require('gulp'),
	htmlmin = require('gulp-htmlmin'),
	seajsCombo = require('gulp-seajs-combo'),
//    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache');
//Styles任务
gulp.task('css', function() {
    //编译sass
//    return gulp.src('stylesheets/main.scss')
//    .pipe(sass())
//    //添加前缀
//    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    //保存未压缩文件到我们指定的目录下面

     return gulp.src("www/src/css/main.css")
	    .pipe(rename({ suffix: '.min' }))
	     //压缩样式文件
	    .pipe(minifycss())
	    .pipe(gulp.dest('www/build/css'))
	    .pipe(notify({ message: 'css task ok' }));

//    //输出压缩文件到指定目录
//    .pipe(gulp.dest('build'))
    //提醒任务完成
//    .pipe(notify({ message: 'Styles task complete' }));
});

//gulp.task( 'm', function(){
//    return gulp.src( 'src/js/main.js' )
//        .pipe( seajsCombo() )
//        .pipe( gulp.dest('build/js') );
//});
// Scripts
gulp.task('hint', function() {
    //js代码校验
    return gulp.src(['www/src/js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    //js代码合并
//    .pipe(concat('main.js'))
//    //给文件添加.min后缀
////    .pipe(rename({ suffix: '.min' }))
//    //压缩脚本文件
//    .pipe(uglify())
//    //输出压缩文件到指定目录
//    .pipe(gulp.dest('build/js'))
    //提醒任务完成
    .pipe(notify({ message: 'hint task complete' }));
});
// Images
//Images
gulp.task('images', function() {
  return gulp.src('www/src/img/icons/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('www/build/img/icons/'))
    .pipe(notify({ message: 'Images task complete' }));
});
//压缩html
gulp.task('html', function() {
  return gulp.src('www/src/templates/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('www/build/templates'))
    .pipe(notify({ message: 'html task ok' }));

});
gulp.task( 'js', function(){
  return gulp.src('www/src/js/main.js')
      .pipe( seajsCombo({
         ignore : [ 'ionic',"jquery","store","ngIOS9UIWebViewPatch","ngCordova" ], // 合并时忽略该依赖模块
         // 将seajs.use中的路径做映射
         map : {
           "js/api" : "./api",
           "js/app" : "./app",
           "js/service" : "./service",
           "js/indexCtrl" : "./indexCtrl",
           "js/controllers" : "./controllers",
           "js/route" : "./route"
         }
       }))
      //.pipe(uglify({
      //    mangle: false,
      //    compress: false
      //}))
      .pipe( gulp.dest('www/build/js'));
});
//gulp.task('cmd', function() {
//	return gulp.src('src/js/main.js') //main文件
//	.pipe(cmdPack({
//	    mainId: 'build/main', //初始化模块的id
//	    base: 'src/', //base路径
//	}))
//	//.pipe(uglify())
//	.pipe(gulp.dest('build/js'));//输出到目录
//})
// Default task
gulp.task('default', function() {
    gulp.start('hint','css','js','html');

});
// Watch
//gulp.task('watch', function() {
//  // Watch .scss files
////  gulp.watch('stylesheets/*.scss', ['styles']);
//  // Watch .js files
//  gulp.watch('javascripts/*.js', ['scripts']);
//  // Watch image files
//  gulp.watch('images/*', ['images']);
//  // Create LiveReload server
//  livereload.listen();
//  // Watch any files in assets/, reload on change
//  gulp.watch(['assets/*']).on('change', livereload.changed);
//});
