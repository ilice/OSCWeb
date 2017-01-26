'use strict'

var gulp = require('gulp')
var sass = require('gulp-sass')
var rename = require('gulp-rename')
var del = require('del')
var babel = require('babelify')
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var browserSync = require('browser-sync')
var reload = browserSync.reload
var standard = require('gulp-standard')
var cache = require('gulp-cache')
var imagemin = require('gulp-imagemin')
const size = require('gulp-size')
const psi = require('psi')
const nodemon = require('gulp-nodemon')
const mocha = require('gulp-spawn-mocha')

// Lint JavaScript
gulp.task('lint', function () {
  return gulp.src(['./src/**/*.js', './test/**/*.jsx', '!node_modules/**'])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true,
      quiet: true
    }))
})

gulp.task('clean', function () {
  return del.sync([
    'public', 'src/env'
  ])
})

gulp.task('styles', function () {
  gulp
    .src('index.scss')
    .pipe(sass())
    .pipe(rename('osc.css'))
    .pipe(gulp.dest('public'))
})

// Optimize images
gulp.task('images', () =>
  gulp.src('assets/**/*')
    .pipe(cache(imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('public'))
    .pipe(size({title: 'images'}))
)

gulp.task('build', function () {
  browserify('./src/index.js', {
    debug: true
  }).transform(babel, {
    presets: ['es2015']
  })
  .bundle()
  .on('error', function (err) {
    console.log(err)
    this.emit('end')
  })
  .pipe(source('index.js'))
  .pipe(rename('osc.js'))
  .pipe(gulp.dest('public'))
})

gulp.task('default', ['clean', 'prod-environment', 'styles', 'images', 'build'])

// Run PageSpeed Insights
// Update the below URL to the public URL of your site
// By default we use the PageSpeed Insights free (no API key) tier.
// Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
gulp.task('mobile', function () {
  return psi('opensmartcountry.com', {
        // key: key
    nokey: 'true',
    strategy: 'mobile'
  }).then(function (data) {
    console.log('Speed score: ' + data.ruleGroups.SPEED.score)
    console.log('Usability score: ' + data.ruleGroups.USABILITY.score)
  })
})

gulp.task('desktop', function () {
  return psi('opensmartcountry.com', {
    nokey: 'true',
        // key: key,
    strategy: 'desktop'
  }).then(function (data) {
    console.log('Speed score: ' + data.ruleGroups.SPEED.score)
  })
})

// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
var BROWSER_SYNC_RELOAD_DELAY = 500

gulp.task('nodemon', ['dev-environment'], function (cb) {
  var called = false
  return nodemon({

    // nodemon our expressjs server
    script: 'server.js',

    // watch core server file(s) that require server restart on change
    watch: ['server.js']
  })
    .on('start', function onStart () {
      // ensure start only got called once
      if (!called) { cb() }
      called = true
    })
    .on('restart', function onRestart () {
      // reload connected browsers after a slight delay
      setTimeout(function reload () {
        browserSync.reload({
          stream: false
        })
      }, BROWSER_SYNC_RELOAD_DELAY)
    })
})

gulp.task('browser-sync', ['nodemon'], function () {
  // for more browser-sync config options: http://www.browsersync.io/docs/options/
  browserSync({

    // informs browser-sync to proxy our expressjs app which would run at the following location
    proxy: 'http://localhost:8000'

    // informs browser-sync to use the following port for the proxied app
    // notice that the default port is 3000, which would clash with our expressjs
    // port: 3000
  })
})

gulp.task('develop', ['browser-sync'], function () {
  var watcherJS = gulp.watch('./src/**/**/*', ['build'])
  watcherJS.on('change', function (event) {
    console.log('JS File ' + event.path + ' was ' + event.type + ', running tasks...')
  })

  var watcherSCSS = gulp.watch('./*.scss', ['styles'])
  watcherSCSS.on('change', function (event) {
    console.log('Styles File ' + event.path + ' was ' + event.type + ', running tasks...')
  })

  var watcherAssets = gulp.watch('./assets/*', ['images'])
  watcherAssets.on('change', function (event) {
    console.log('Assets File ' + event.path + ' was ' + event.type + ', running tasks...')
  })

  gulp.watch(['*.html', './public/*'], reload)
})

gulp.task('test-environment', ['secrets'], function () {
  gulp
    .src('settings/test.js')
    .pipe(rename('index.js'))
    .pipe(gulp.dest('src/env'))
})

gulp.task('dev-environment', ['secrets'], function () {
  gulp
    .src('settings/dev.js')
    .pipe(rename('index.js'))
    .pipe(gulp.dest('src/env'))
})

gulp.task('prod-environment', ['secrets'], function () {
  gulp
    .src('settings/dev.js')
    .pipe(rename('index.js'))
    .pipe(gulp.dest('src/env'))
})

gulp.task('secrets', ['clean'], function () {
  gulp
    .src('settings/secrets.ini')
    .pipe(rename('secrets.js'))
    .pipe(gulp.dest('src/env'))
})

gulp.task('test', ['test-environment'], function () {
  return gulp.src(['test/*.test.js'], { read: false })
    .pipe(mocha({
      reporter: 'spec',
      globals: {
        chai: require('chai'),
        register: require('jsdom-global/register')
      }
    }))
})
