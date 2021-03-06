const gulp = require('gulp'),
      sourcemaps = require('gulp-sourcemaps'),
      rename = require('gulp-rename'),
      cssnano = require('gulp-cssnano'),
      concat = require('gulp-concat');

// Default task
gulp.task('default', [ 'css:concat' ]);

gulp.task('css:concat', [ 'fonts:copy' ], function () {
    return gulp.src([
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
