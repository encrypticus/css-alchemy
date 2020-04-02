const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge'); // объединяет массивы и объекты конфигураций из нескольких файлов-модулей
const setEntry = require('./webpack/options/entry'); // опция устанавливает точку входа для сборщика
const setOutput = require('./webpack/options/output'); // опция устанавливает путь, по которому будет лежать бандл
const htmlWebpackPlugin = require('./webpack/plugins/html-webpack-plugin'); // плагин генерирует html-файл в папке сборки
const processCss = require('./webpack/presets/css'); // пресет обрабатывает css-файлы
const processSassScss = require('./webpack/presets/sass-scss'); // пресет обрабатывает sass/scss-файлы
const processImages = require('./webpack/presets/img'); // пресет обрабатывет изображения
const processFonts = require('./webpack/presets/font'); // пресет обрабатывает шрифты
const processPug = require('./webpack/presets/pug'); // пресет обрабатывает pug-файлы
const miniCssExtractPlugin = require('./webpack/plugins/mini-css-extract-plugin'); // модуль обрабатывает css-файлы
const addOptimization = require('./webpack/options/optimization'); // опция добавляет оптимизацию для конечного кода
const generateMap = require('./webpack/options/source-map'); // опция включает генерацию карты js/css-кода (sourcemap)
const enableStylelint = require('./webpack/plugins/stylelint-webpack-plugin'); // плагин включает линтинг css/sass/scss
const processJs = require('./webpack/presets/js'); // пресет обрабатывает js-файлы
const browserSync = require('./webpack/plugins/browser-sync-webpack-plugin'); // плагин browser sync
const cleanWebpackPlugin = require('./webpack/plugins/clean-webpack-plugin'); // плагин очищает папку сборки перед каждой пересборкой

module.exports = () => {
  const commonConfig = webpackMerge(
    setEntry({
      index: './src/index.js',
    }),
    setOutput({
      filename: '[name].js',
      path: path.resolve(__dirname, '../themes/alchemy/source'),
      publicPath: '/'
    }),
    miniCssExtractPlugin({
      filename : '[name].css',
      chunkFilename: '[name].css'
    }),
    processCss(),
    processSassScss(),
    processImages({
      imageLoader: {
        name: process.env.mode === 'development' ? 'img/[name].[ext]' : 'img/[name].[contenthash:8].[ext]',
      },
      imageWebpackLoader: {
        mozjpeg: {
          progressive: true,
          quality: 65
        },
        optipng: {
          enabled: false,
        },
        pngquant: {
          quality: [0.65, 0.90],
          speed: 4
        },
        gifsicle: {
          interlaced: false,
        },
        webp: {
          quality: 75
        },
        svgo: {}
      },
      exclude: [/fonts/],
      regexp: /\.(png|gif|jpg|jpeg|svg)$/
    }),
    processFonts(),
    processJs(),
    cleanWebpackPlugin(),
    enableStylelint()
  );

  if (process.env.mode === 'development') {
    return webpackMerge(
      commonConfig,
      generateMap(),
      browserSync()
    );
  }

  if (process.env.mode === 'production') {
    return webpackMerge(
      commonConfig,
      addOptimization()
    );
  }
};
