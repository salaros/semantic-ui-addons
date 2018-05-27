var gulp = require('gulp'),
    less = require('gulp-less'),
    replace = require('gulp-replace'),
    flatten = require('gulp-flatten'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer');

var tasks = require('./semantic-ui/tasks/config/tasks.js'),
    settings = tasks.settings;

gulp.task('less:compile', function () {
  return gulp.src('./less/*.less')
    .pipe(plumber(settings.plumber.less))
    .pipe(less(settings.less))
    .pipe(autoprefixer(settings.prefix))
    .pipe(replace(/((.*?)\n)+\/\* Semantic UI Addons \*\//gmi, ''))
    .pipe(flatten())
    .pipe(gulp.dest('./dist/'));
});
