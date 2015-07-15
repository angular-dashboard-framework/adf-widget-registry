'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var util = require('util');

var browserSync = require('browser-sync');

var middleware = require('./proxy');

var nodemon = require('nodemon');

function browserSyncInit(baseDir, files, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  if(baseDir === paths.src || (util.isArray(baseDir) && baseDir.indexOf(paths.src) !== -1)) {
    routes = {
      '/bower_components': 'bower_components'
    };
  }

  browserSync.instance = browserSync.init(files, {
    startPath: '/',
    server: {
      baseDir: baseDir,
      middleware: middleware,
      routes: routes
    },
    browser: browser
  });
}

gulp.task('serveapi', function (cb) {
	var called = false;
	return nodemon({script: paths.server + '/index.js'}).on('start', function () {
		if (!called) {
			called = true;
			cb();
		}
	});
});

gulp.task('serve', ['serveapi', 'watch'], function () {
  browserSyncInit([
    paths.tmp + '/serve',
    paths.src,
  ], [
    paths.tmp + '/serve/app/**/*.css',
    paths.src + '/app/**/*.js',
    paths.src + 'src/assets/images/**/*',
    paths.tmp + '/serve/*.html',
    paths.tmp + '/serve/app/**/*.html',
    paths.src + '/app/**/*.html'
  ]);
});

gulp.task('serve:dist', ['build', 'serveapi'], function () {
  browserSyncInit(paths.dist);
});

gulp.task('serve:e2e', ['inject', 'serveapi'], function () {
  browserSyncInit([paths.tmp + '/serve', paths.src], null, []);
});

gulp.task('serve:e2e-dist', ['build', 'serveapi'], function () {
  browserSyncInit(paths.dist, null, []);
});
