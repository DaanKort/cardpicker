'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

gulp.task('sass', function () {
    return gulp.src('./sass/index.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "../cardpicker"
    });

    gulp.watch("../cardpicker/scss/*.scss", ['sass']);
	gulp.watch("../cardpicker/*.html").on('change', browserSync.reload);
	gulp.watch("../cardpicker/*.css").on('change', browserSync.reload);
});