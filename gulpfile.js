const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('sass', () => {
  return gulp.src('./source/_posts/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest((file) => {
      return file.base;
    }));
});

gulp.task('watch', () => {
  gulp.watch('./source/_posts/**/*.scss', gulp.series('sass'));
});