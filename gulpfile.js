var gulp = require('gulp');
var sass = require('gulp-sass');
var css_nano = require ('gulp-cssnano');
var pug = require('gulp-pug');
var browsersync = require('browser-sync').create();

gulp.task('livereload',function(){
    browsersync.init({
        server: {
            baseDir: 'src/post'
        },
    })
})
gulp.task('sass-compile',function(){
   return gulp.src('views/sass/*.scss')
    .pipe(sass())
    .pipe(css_nano())
    .pipe(gulp.dest('src/css'))
    .pipe(browsersync.stream());
});
gulp.task('watch',function(){
    
    gulp.watch('views/pug/*.pug',gulp.series('pug-compile'))
    gulp.watch('index.html').on('change',browsersync.reload);
});

gulp.task('pug-compile', function buildHTML() {
    return gulp.src('views/pug/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('src/post'));
  });

gulp.task('default',gulp.parallel('livereload','sass-compile','watch','pug-compile'));  