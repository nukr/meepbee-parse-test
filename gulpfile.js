var gulp = require('gulp');
var to5 = require('gulp-6to5');
var sourcemaps = require('gulp-sourcemaps')
var cache = require('gulp-cached');
var concat = require('gulp-concat');
require('./gulp-tasks/server')

var paths = {
  src: ['src/**/*.js'],
  serverBuild: '.server-built'
}

gulp.task('default', ['6to5', 'watch', 'server:spawn']);

gulp.task('watch', function() {
  gulp.watch('./src/index.js', ['build'])
  gulp.watch('./.server-built/index.js', ['server:restart']);
});

gulp.task('6to5', function() {
  return gulp.src(paths.src)
    .pipe(sourcemaps.init())
    .pipe(to5({blacklist: ['generators']}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.serverBuild))
})

gulp.task('build', ['6to5']);
