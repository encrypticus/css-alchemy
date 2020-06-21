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
const del = require('del');

// Пути ресурсов
const paths = {
  img: [
    'themes/alchemy/layout/components/**/img/*',
    'themes/alchemy/layout/blocks/**/img/*',
    'themes/alchemy/thumbnails/*',
    'themes/alchemy/img/*'
  ],
  favicons: 'themes/alchemy/favicons/*',
  sassPosts: 'source/_posts/**/*.scss',
  sassTheme: ['themes/alchemy/sass/common.scss', 'themes/alchemy/sass/index.scss'],
  stylelint: ['source/_posts/**/*.scss', 'themes/alchemy/layout/**/*.scss'],
  fonts: 'themes/alchemy/fonts/*',
  clean: ['themes/alchemy/source/**', '!themes/alchemy/source/**/*.js']
};

// Очистка папки сборки
const clean = async () => {
  await del(paths.clean);
  console.log('Папка сборки успешно очищена!');
};

// Обработка sass в директории /source/_posts/
const process_sass_in_posts = () => {

  const plugins = [autoprefixer()];

  return gulp.src(paths.sassPosts)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(gulp.dest((file) => {
      return file.base;
    }));
};

// Обработка sass в директории /themes/alchemy/sass/
const process_sass_in_theme = () => {

  const plugins = [autoprefixer()];

  return gulp.src(paths.sassTheme)
    .pipe(sass({ outputStyle: 'compressed', includePaths: ['node_modules'] }).on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(gulp.dest('themes/alchemy/source'));
};

// Обработка графики
const processImg = () => {
  return gulp.src(paths.img)
    .pipe(imagemin([
        imageminMozjpeg({
          progressive: true,
          quality: 70
        }),
        // imagemin.optipng({ optimizationLevel: 7 }),
        pngquant(),
        imagemin.gifsicle(),
        imagemin.svgo()
      ],
      { verbose: true }))
    .pipe(flatten())
    .pipe(gulp.dest('themes/alchemy/source/img'));
};

// Обработка фавиконок
const favicons = () => {
  return gulp.src(paths.favicons)
    .pipe(gulp.dest('themes/alchemy/source/favicons'))
};

// Линтинг sassPosts/scss
const stylelint = () => {
  return gulp.src(paths.sassPosts)
    .pipe(gulpStylelint({
      fix: true,
      reporters: [
        { formatter: 'string', console: true }
      ]
    }))
    .pipe(gulp.dest((file) => {
      return file.base;
    }));
};

// Обработка шрифтов
const processFonts = () => {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest('themes/alchemy/source/fonts'));
};

// Слежение за изменениями
const watch = () => {
  gulp.watch(paths.sassPosts, gulp.series(process_sass_in_posts));

  gulp.watch(paths.sassTheme.concat(paths.stylelint), gulp.series(process_sass_in_theme));

  gulp.watch(paths.img, gulp.series(processImg));

  gulp.watch(paths.favicons, gulp.series(favicons));

  gulp.watch(paths.fonts, gulp.series(processFonts));
};

exports.stylelint = stylelint;

exports.default = gulp.series(
  clean,
  gulp.parallel(
    gulp.series(process_sass_in_posts, process_sass_in_theme, stylelint),
    processImg,
    favicons,
    processFonts
  ),
  watch
);