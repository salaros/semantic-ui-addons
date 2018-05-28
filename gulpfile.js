var gulp = require('gulp'),
    less = require('gulp-less'),
    replace = require('gulp-replace'),
    flatten = require('gulp-flatten'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    clone = require('gulp-clone'),
    cssnano = require('gulp-cssnano');

var tasks = require('./semantic-ui/tasks/config/tasks.js'),
    settings = tasks.settings;

// Default task
gulp.task('default', ['less:compile', 'semantic-ui:build']);

// Build Semantic UI assets
gulp.task('semantic-ui:build', function () {
    var exec = require('child_process').exec;

    // Run the dependency gulp file first
    exec('gulp --gulpfile ./semantic-ui/gulpfile.js build', function(error, stdout, stderr) {
        console.log('semantic-ui/gulpfile.js:');
        console.log(stdout);
        if(error) {
            console.log(error, stderr);
        }
    });
});

// LESS compilation
gulp.task('less:compile', function () {
  var stream = gulp.src('./less/*.less')
    .pipe(plumber(settings.plumber.less))
    .pipe(sourcemaps.init())
    .pipe(less(settings.less))
    .pipe(autoprefixer(settings.prefix))
    .pipe(replace(/((.*?)\n)+\/\* Semantic UI Addons \*\//gmi, ''))
    .pipe(flatten())
    .pipe(gulp.dest('./dist/'))
    .pipe(cssnano())
    .pipe(rename({
        suffix: ".min",
    }))
    .pipe(sourcemaps.write("./", {
        addComment: false
    }))
    .pipe(gulp.dest('./dist/'));
});

// Watch task for LESS compilation
gulp.task("watch", function () {
    gulp.watch("./less/**/*.less", ["less:compile"]);
});
