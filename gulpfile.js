const gulp = require('gulp'),
      sourcemaps = require('gulp-sourcemaps'),
      rename = require('gulp-rename'),
      cssnano = require('gulp-cssnano'),
      less = require('gulp-less'),
      concat = require('gulp-concat'),
      strip = require('gulp-strip-css-comments'),
      newLinesFix = require('gulp-remove-empty-lines');

// Default task
gulp.task('default', [ 'css:concat', 'less:compile' ]);

gulp.task('less:compile', function () {
    return gulp.src('./addons/!index.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(strip())
        .pipe(newLinesFix())
        .pipe(rename({
            basename: "addons",
        }))
        .pipe(gulp.dest('./dist/components'))
        .pipe(cssnano())
        .pipe(rename({
            suffix: ".min",
        }))
        .pipe(sourcemaps.write("./", {
            addComment: false
        }))
        .pipe(gulp.dest('./dist/components'));
});

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
