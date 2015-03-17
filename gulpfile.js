var gulp = require("gulp");
var babel = require("gulp-babel");
var sourcemaps = require("gulp-sourcemaps");
var cache = require("gulp-cached");
var concat = require("gulp-concat");
require("./gulp-tasks/server");

var paths = {
  src: ["src/**/*.js"],
  serverBuild: ".server-built"
};

gulp.task("default", ["babel", "watch"], function () {
  gulp.start("server:spawn");
});

gulp.task("watch", function() {
  gulp.watch("./src/*.js", ["build"]);
  gulp.watch("./.server-built/*.js", ["server:restart"]);
});

gulp.task("babel", function() {
  return gulp.src(paths.src)
    .pipe(sourcemaps.init())
    .pipe(babel({optional: "runtime"}))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.serverBuild));
});

gulp.task("build", ["babel"]);
