var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var uncss = require('gulp-uncss');

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./www"
        }
    });
});
gulp.task('uglify', function() {
  gulp.src('./src/js/main.js')
    .pipe(uglify())
    .pipe(gulp.dest('./www/js/'))
});
gulp.task('uncss', function() {
    return gulp.src('./www/css/styles.css')
        .pipe(uncss({
            html: ['./www/index.html']
        }))
        .pipe(gulp.dest('./www/css/'));
});
gulp.task('csso', function() {
  return gulp.src('./www/css/styles.css')
    .pipe(csso())
    .pipe(gulp.dest('./www/css/'));
})
gulp.task('sass', function () {
  return gulp.src('./src/css/*.scss')
        .pipe(sass({errLogToConsole: true}))
        .pipe(autoprefixer(
            'last 10 version',
            '> 1%',
            'ie 9',
            'ios 6',
            'android 4'
        ))
        // .pipe(cssmin())
        .pipe(gulp.dest('./www/css/'))
        .pipe(reload({stream:true}));
});


gulp.task('html', function () {
  gulp.src('./www/*.html')
  .pipe(reload({stream:true}));
});
// gulp.task('js', function() {
//     gulp.src('./src/*.js')
//       .pipe(connect.reload())
// });
gulp.task('watch', function () {
  gulp.watch(['./www/*.html'], ['html']);
  // gulp.watch(['./src/js/*.js'], ['js']);
  gulp.watch(['./src/css/*.scss'], ['sass'])
});

gulp.task('default', ['browser-sync','sass','uncss','watch']);
gulp.task('final', ['uglify'])
