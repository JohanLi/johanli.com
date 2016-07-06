var gulp = require('gulp');

var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var nodemon = require('gulp-nodemon');

gulp.task('sass', function () {
    gulp.src('src/sass/base.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('public/css'));
});

gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

gulp.task('imagemin', function() {
    var imgSource = 'src/img/**/*';
    var imgDestination = 'public/img';

    gulp.src(imgSource)
        .pipe(changed(imgDestination))
        .pipe(imagemin())
        .pipe(gulp.dest(imgDestination));
});

gulp.task('watch', function () {
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/img/*.*', ['imagemin']);
});

gulp.task('start', function () {
    nodemon({
        script: 'app.js',
        ext: 'js pug',
        ignore: 'src',
        env: {'NODE_ENV': 'development'}
    })
});

gulp.task('default', ['sass', 'scripts', 'imagemin'], function() {});

gulp.task('dev', ['watch', 'start'], function() {});