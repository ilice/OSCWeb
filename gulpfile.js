var gulp = require ('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var del = require('del');
var babel = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('clean', function () {
  return del.sync([
    'public'
  ]);
});

gulp.task('styles', function(){
  gulp
    .src('index.scss')
    .pipe(sass())
    .pipe(rename('osc.css'))
    .pipe(gulp.dest('public'));
});

gulp.task('assets', function(){
  gulp
    .src('assets/*.*')
    .pipe(gulp.dest('public'));
});

gulp.task('favicon', function(){
  gulp
    .src('assets/favicon/*')
    .pipe(gulp.dest('public'));
});

gulp.task('build', function(){
  browserify('./src/index.js', {debug: true}).transform(babel, { presets: [ 'es2015' ] })
  .bundle()
  .on('error', function (err) { console.log(err); this.emit('end');})
  .pipe(source('index.js'))
  .pipe(rename('osc.js'))
  .pipe(gulp.dest('public'));
});


// watch files for changes and reload
gulp.task('serve', function() {

  browserSync({
    server: {
      baseDir: './'
    }
  });

  var watcherJS = gulp.watch('./src/**/**/*', ['build']);
  watcherJS.on('change', function(event) {
    console.log('JS File ' + event.path + ' was ' + event.type + ', running tasks...');
  });

  var watcherSCSS = gulp.watch('./*.scss', ['styles']);
  watcherSCSS.on('change', function(event) {
    console.log('Styles File ' + event.path + ' was ' + event.type + ', running tasks...');
  });

  var watcherAssets = gulp.watch('./assets/*', ['assets', 'favicon']);
  watcherAssets.on('change', function(event) {
    console.log('Assets File ' + event.path + ' was ' + event.type + ', running tasks...');
  });

  gulp.watch(['*.html', './public/*'], reload);
});

gulp.task('default', ['clean', 'styles', 'assets', 'favicon', 'build']);
