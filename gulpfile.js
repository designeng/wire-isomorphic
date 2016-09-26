var gulp = require('gulp');
var wrap = require('gulp-wrap');
var handlebars = require('gulp-handlebars');
var babel = require('gulp-babel');

var exec = require('child_process').exec;

var buildTpl = function() {
    return wrap("module.exports = require('handlebars').template(<%= contents %>)");
};

// development build task
gulp.task('default', ['tpl']);
 
gulp.task('tpl', function() {
    return gulp.src('src/templates/**/*.hbs')
        .pipe(handlebars({
            handlebars: require('handlebars')
        }))
        .pipe(buildTpl())
        .pipe(gulp.dest('src/templates/build/'));
});

gulp.task('vidom-jsx', function(){
    return gulp.src('src/templates/**/*.jsx').
        pipe(babel({
            plugins: ['vidom-jsx']
        })).
        pipe(gulp.dest('src/templates/build/'));
});

var wrapForExport = function() {
    return wrap(`import { html } from 'snabbdom-jsx'; module.exports = <%= contents %>`);
}

gulp.task('virtualdom', function(){
    return gulp.src('src/templates/**/*.jsx').
        pipe(babel({
            plugins: ["transform-remove-strict-mode", ['transform-react-jsx', {'pragma': 'h'}]]
        }))
        .pipe(wrapForExport())
        .pipe(gulp.dest('src/templates/build/'));
});