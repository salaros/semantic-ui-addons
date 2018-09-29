var gulp = require('gulp'),
    less = require('gulp-less'),
    replace = require('gulp-replace'),
    flatten = require('gulp-flatten'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    clone = require('gulp-clone'),
    cssnano = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    exec = require('gulp-exec');

var tasks = require('./semantic-ui/tasks/config/tasks.js'),
    settings = tasks.settings;

// Default task
gulp.task('default', [ 'css:concat' ]);

gulp.task('css:concat', [ 'semantic-ui:build', 'less:compile', 'fonts:copy' ], function () {
    gulp.src([
            './node_modules/lato-font/css/lato-font.css',
            './dist/semantic.css',
            './dist/semantic-ui-addons.css'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('semantic-ui-addons.css'))
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

gulp.task('fonts:copy', function (cb) {
    return gulp.src('node_modules/lato-font/fonts/**/*')
                .pipe(gulp.dest('./fonts/'));

});

// Build Semantic UI assets
gulp.task('semantic-ui:build', function (cb) {

    // Run the dependency gulp file first
    return gulp.src('./semantic-ui/gulpfile.js')
        .pipe(exec('gulp --gulpfile <%= file.path %> build', function(err, stdout, stderr) {
                console.log('semantic-ui/gulpfile.js:');
                console.log(stdout);
                cb(err);
            })
        )
        .pipe(exec.reporter({
            err: true, // default = true, false means don't write err
            stderr: true, // default = true, false means don't write stderr
            stdout: true // default = true, false means don't write stdout
        }));
});

// LESS compilation
gulp.task('less:compile', function () {
  gulp.src('./less/*.less')
    .pipe(plumber(settings.plumber.less))
    .pipe(less(settings.less))
    .pipe(autoprefixer(settings.prefix))
    .pipe(replace(/((.*?)\n)+\/\* Semantic UI Addons \*\//gmi, ''))
    .pipe(flatten())
    .pipe(gulp.dest('./dist/'));
});

// Watch task for LESS compilation
gulp.task("watch", function () {
    gulp.watch("./less/**/*.less", ["less:compile"]);
});
