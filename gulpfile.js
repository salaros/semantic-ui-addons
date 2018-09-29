var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    exec = require('gulp-exec');

var tasks = require('./semantic-ui/tasks/config/tasks.js'),
    settings = tasks.settings;

// Default task
gulp.task('default', [ 'css:concat' ]);

gulp.task('css:concat', [ 'semantic-ui:build', 'fonts:copy' ], function () {
    gulp.src([
            './node_modules/lato-font/css/lato-font.css',
            './dist/semantic.css'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('semantic.css'))
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
