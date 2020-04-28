const gulp = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const imgCompress = require('imagemin-jpeg-recompress');
const imageminMozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
const flatten = require('gulp-flatten');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const gulpStylelint = require('gulp-stylelint');

// Пути ресурсов
const paths = {
  img: [
    'themes/alchemy/layout/components/**/img/*',
    '!themes/alchemy/layout/components/**/img/css/*',
    'themes/alchemy/layout/blocks/**/img/*',
    '!themes/alchemy/layout/blocks/**/img/css/*',
    'themes/alchemy/thumbnails/*',
  ],
  favicons: 'themes/alchemy/favicons/*',
  sass: 'source/_posts/**/*.scss'
};

// Обработка sass/scss
gulp.task('sass', () => {

  const plugins = [autoprefixer()];

  return gulp.src(paths.sass)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(gulp.dest((file) => {
      return file.base;
    }));
});

// Обработка графики
gulp.task('imgCompress', () => {
  return gulp.src(paths.img)
    .pipe(imagemin([
        imageminMozjpeg({
          progressive: true,
          quality: 70
        }),
        imagemin.optipng({ optimizationLevel: 7 }),
        imagemin.gifsicle(),
        imagemin.svgo()
      ],
      { verbose: true }))
    .pipe(flatten())
    .pipe(gulp.dest('themes/alchemy/source/img'));
});

// Обработка фавиконок
gulp.task('favicons', () => {
  return gulp.src(paths.favicons)
    .pipe(gulp.dest('themes/alchemy/source/favicons'))
});

// Линтинг sass/scss
gulp.task('lint-sass', () => {
  return gulp.src(paths.sass)
    .pipe(gulpStylelint({
      fix: true,
      reporters: [
        { formatter: 'string', console: true }
      ]
    }))
    .pipe(gulp.dest((file) => {
      return file.base;
    }));
});

// Слежение за изменениями
gulp.task('watch', () => {
  gulp.watch('./source/_posts/**/*.scss', gulp.parallel('sass'));
  gulp.watch(paths.img, gulp.parallel('imgCompress'));
});