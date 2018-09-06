var gulp = require('gulp'),
    less = require('gulp-less'),
    cssmin = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),        // 文件更名
    notify = require('gulp-notify');      // 提示信息
//- 多个文件合并为一个；
gulp.task('testLess', function () {
    gulp.src('styles/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('./styles/css'));
});
gulp.task('css', function() {
    return gulp.src('static/css/*.css')
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./static/css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssmin())
        .pipe(gulp.dest('./static/css'))
        .pipe(notify({ message: 'css task ok' }));

});
gulp.task('default', function() {
    gulp.run('css');
    // 将你的默认的任务代码放在这
    gulp.watch('static/css/*.css', ['css']); //当所有less文件发生改变时，调用testLess任务
});