var gulp = require('gulp');
var gulpConnect = require('gulp-connect');
var clean = require('gulp-clean');
//import modul 
var gulpMinifyCss = require('gulp-minify-css');
var gulpConcat = require('gulp-concat');
var gulpUglify = require('gulp-uglify');
var gulpHtmlmin = require('gulp-htmlmin');
const image = require('gulp-image');

gulp.task('image', async function () {
    gulp.src('./src/img/*')
      .pipe(image())
      .pipe(gulp.dest('dist'))
      .pipe(gulpConnect.reload());
  });

//task for minify
gulp.task('minify-css', async function(){
    gulp.src('./src/css/*.css')
        .pipe(gulpMinifyCss({
            compatibility:'ie8'
        }))
        .pipe(gulp.dest('./dist/'))
        .pipe(gulpConnect.reload());
});

gulp.task('minify-js', async function () {
    gulp
        .src([
            './src/js/*.js'
        ])
        .pipe(gulpConcat('bundle.js'))
        .pipe(gulpUglify())
        .pipe(gulp.dest('dist'))
        .pipe(gulpConnect.reload());
});

gulp.task('minify-html', async function () {
    gulp.src('src/*.html')
        .pipe(gulpHtmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(gulpConnect.reload());
});

//watch task
gulp.task('watch', async function () {
    gulp.watch('./src/js/*.js', gulp.series('minify-js'));
    gulp.watch('./src/css/*.css', gulp.series('minify-css'));
    gulp.watch('./src/*.html', gulp.series('minify-html'));
});


gulp.task('sayHello', async function(){
    console.log("Hello, Selamat datang di Gulp!");
});

gulp.task('server', async function(){
    gulpConnect.server({
        root: "dist",
        livereload:true
    });
});

gulp.task('default', gulp.series('watch', 'server'));

//task build

gulp.task('clean', function() {
    return gulp.src('dist', {
      read: false,
      allowEmpty: true
    }).pipe(clean());
  });
  
  gulp.task('build', gulp.series('clean', 'minify-css', 'minify-js', 'minify-html', 'image'));