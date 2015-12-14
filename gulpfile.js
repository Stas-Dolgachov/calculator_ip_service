'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var watch  = require('gulp-watch');
var clean = require('gulp-rimraf');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('babelify');
var browserify = require('browserify');
var stream = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var path = require('path');
var mainBowerFiles = require('main-bower-files');


var sourcePath = "app";
var buildPath = "dist";

var src = {
        html: sourcePath + '/*.html',
        js: sourcePath + '/js/**/*.*',
        jsMain: sourcePath + '/js/index.js',
        sass: sourcePath + '/sass/**/*.sass',
        img: sourcePath + '/img/**/*.*',
        originalVendor: sourcePath + '/vendor/**/*.*',
        vendor: mainBowerFiles('**/*.js'),
        fonts: sourcePath + '/fonts/**/*.*'
};

var dest = {
        html: buildPath,
        js: buildPath + '/js',
        styles: buildPath + '/css',
        img: buildPath + '/img',
        vendor: buildPath + '/vendor',
        fonts: buildPath + '/fonts'
};

gulp.task('server', function() {
    browserSync({
        port: 8080,
        server: {
            baseDir: buildPath,
            index: 'index.html'
        }
    });
});

gulp.task('html', function() {
    gulp.src(src.html)
        .pipe(plumber())
        .pipe(gulp.dest(dest.html))
        .pipe(reload({stream: true}));
});


gulp.task('clean:js', function() {
    return gulp.src(dest.js + '/**/*.js', {
        read: false
        })
        .pipe( clean({
            force: true
        }));
});

gulp.task('browserify', function() {
    return browserify(src.jsMain, {debug:true})
        .transform('babelify', {presets: ["es2015"]})
        .bundle()
        .pipe(plumber())
        .pipe(stream('calculator.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(dest.js))
        .pipe(reload({stream: true}));
});

gulp.task('lint', function () {
   gulp.src(src.js)
    .pipe(jshint('./.jshintrc'))
    .pipe(jshint.reporter(stylish));
});

gulp.task('sass', ['clean:css'], function () {
    return gulp.src(src.sass)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({ style: 'expanded' }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dest.styles))
        .pipe(reload({stream: true}));
});

gulp.task('clean:css', function () {
    return gulp.src(dest.styles + '/*.css', {
        read: false
    })
        .pipe(clean({
            force: true
        }));
});

gulp.task('img', function() {
    gulp.src(src.img)
        .pipe(gulp.dest(dest.img))
        .pipe(reload({stream: true}));
});

gulp.task('watch', function(){
    watch([src.html], function (event, cb) {
        gulp.start('html');
    });

    watch([src.sass], function (event, cb) {
        gulp.start('sass');
    });

    watch([src.js], function (event, cb) {
        gulp.start('browserify');
    });
});

gulp.task('vendor', function(){
    gulp.src(src.originalVendor)
        .pipe(gulp.dest(dest.vendor));

    gulp.src(src.vendor)
        .pipe(gulp.dest(dest.vendor));
});

gulp.task('fonts', function () {
    gulp.src(src.fonts)
        .pipe(gulp.dest(dest.fonts))
})

gulp.task('build', ['html', 'sass', 'browserify', 'server', 'lint']);

gulp.task('develop',['vendor', 'fonts', 'build', 'watch']);
