'use strict';

var gulp = require('gulp');

var paths = gulp.paths;
var mod = gulp.module;

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('partials', function () {
  return gulp.src([
      paths.src + '/app/**/*.html',
      paths.tmp + '/serve/app/**/*.html'
    ])
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache('templates.js', {
      module: mod.name,
      root: 'app'
      //templateBody: '$templateCache.put(\'app/<%= url %>\',\'<%= contents %>\');'
    }))
    .pipe(gulp.dest(paths.tmp + '/partials/'));
});

gulp.task('html', ['inject', 'partials'], function () {
  var partialsInjectFile = gulp.src(paths.tmp + '/partials/templates.js', { read: false });
  var partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    ignorePath: paths.tmp + '/partials',
    addRootSlash: false
  };

  var htmlFilter = $.filter('*.html');
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');
  var assets;

  return gulp.src(paths.tmp + '/serve/*.html')
    .pipe($.inject(partialsInjectFile, partialsInjectOptions))
    .pipe(assets = $.useref.assets())
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe($.ngAnnotate()) //No need to annotate w/ John Papa guidelines
    .pipe($.uglify({preserveComments: $.uglifySaveLicense}))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.replace('../bootstrap/fonts', 'fonts'))
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(htmlFilter)
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(htmlFilter.restore())
    .pipe(gulp.dest(paths.dist + '/'))
    .pipe($.size({ title: paths.dist + '/', showFiles: true }));
});

gulp.task('images', function () {
  return gulp.src(paths.src + '/assets/images/**/*')
    .pipe($.imagemin())
    .pipe(gulp.dest(paths.dist + '/assets/images/'));
});

gulp.task('fonts', function () {
  return gulp.src($.mainBowerFiles())
    .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2,otf}'))
    .pipe($.flatten())
    .pipe(gulp.dest(paths.dist + '/fonts/'));
});

gulp.task('fontawesome', function () {
    return gulp.src('bower_components/font-awesome/fonts/*.{eot,svg,ttf,woff,woff2,otf}')
     .pipe(gulp.dest(paths.dist + '/fonts/'));
});

gulp.task('misc', function () {
  return gulp.src(paths.src + '/**/*.ico')
    .pipe(gulp.dest(paths.dist + '/'));
});

gulp.task('node_modules', function () {
  var packageJson = require('../package.json');
  var sources = [];
  for (var dep in packageJson.dependencies ){
    sources.push('node_modules/' + dep + '/**/*');
  }
  return gulp.src(sources, {base: 'node_modules'})
    .pipe(gulp.dest(paths.distServer + '/node_modules'));
});

gulp.task('server', function () {
  return gulp.src(paths.server + '/*')
    .pipe(gulp.dest(paths.distServer));
});

gulp.task('clean', function (done) {
  $.del([paths.dist + '/', paths.tmp + '/', paths.distServer + '/'], done);
});

gulp.task('build', ['html', 'images', 'fonts', 'fontawesome', 'misc', 'node_modules', 'server']);
