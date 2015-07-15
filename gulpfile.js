'use strict';

// this will use a private gulp instance
var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.module = {
	name: 'adf-widget-registry'
};

gulp.api = {
	name: 'adf-widget-registry'
};

gulp.paths = {
	src: 'src',
	dist: 'dist/public',
	tmp: '.tmp',
	e2e: 'e2e',
	server: 'server',
	distServer: 'dist'
};

require('require-dir')('./gulp');

gulp.task('default', ['clean'], function () {
		gulp.start('build');
});
