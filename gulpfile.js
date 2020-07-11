const gulp = require('gulp');
const sass = require('gulp-sass'); // обработка sass
const imagemin = require('gulp-imagemin'); // оптимизация изображений
const imageminMozjpeg = require('imagemin-mozjpeg'); // оптимизация jpg
const pngquant = require('imagemin-pngquant'); // оптимизация png
const flatten = require('gulp-flatten'); // при обработке файлов копирует их в папку назначения без сохранения структуры каталогов
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const gulpStylelint = require('gulp-stylelint');
const del = require('del'); // удаляет указанные файлы и директории

// Пути ресурсов
const paths = {
  img: [
    'themes/alchemy/layout/components/**/img/*',
    'themes/alchemy/layout/blocks/**/img/*',
    'themes/alchemy/thumbnails/*',
    'themes/alchemy/img/*'
  ],
  favicons: 'themes/alchemy/favicons/*',
  sassPosts: 'source/_posts/**/*.scss', /* source/posts/директория поста/*.scss */
  sassTheme: ['themes/alchemy/sass/common.scss', 'themes/alchemy/sass/index.scss'],
  stylelint: ['source/_posts/**/*.scss', 'themes/alchemy/layout/**/*.scss'],
  fonts: 'themes/alchemy/fonts/*',
  clean: ['themes/alchemy/source/**', '!themes/alchemy/source/**/*.js', '!themes/alchemy/source/CNAME']
};

// Очистка папки сборки
const clean = (path = paths.clean) => {
  return async () => {
    await del(path);
    console.log('Папка сборки успешно очищена!');
  };
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

  gulp.watch(paths.sassTheme.concat('themes/alchemy/layout/**/*.scss'), gulp.series(process_sass_in_theme));

  gulp.watch(paths.img, gulp.series(clean('themes/alchemy/source/img/*'), processImg));

  gulp.watch(paths.favicons, gulp.series(clean('themes/alchemy/source/favicons/*'), favicons));

  gulp.watch(paths.fonts, gulp.series(clean('themes/alchemy/source/fonts'), processFonts));
};

exports.stylelint = stylelint;

exports.default = gulp.series(
  clean(),
  gulp.parallel(
    gulp.series(process_sass_in_posts, process_sass_in_theme, stylelint),
    processImg,
    favicons,
    processFonts
  ),
  watch
);