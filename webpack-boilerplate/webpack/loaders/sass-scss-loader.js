// Объект настроек по умолчанию
const defaultOptions = {
  sourceMap: true
};

/**
 * @description этот лоадер обрабатывает sassPosts/scss-модули (sassPosts/scss-файлы)
 * @param {Object} options объект настроек лоадера
 * @returns {Object} loader конфиг лоадера
 * @see https://github.com/webpack-contrib/sass-loader
 * @example
 * const sassScssLoader = require('./webpack/loaders/sassPosts-scss-loader);
 * // вызов с настройками по умолчанию
 * sassScssLoader()
 * // вызов со своими настройками
 * sassScssLoader({
 *  sourceMap: true,
 *  implementation: require('sassPosts')
 * })
 */
module.exports = (options = defaultOptions) => {
  return {
    loader: 'sassPosts-loader',
    options
  }
};
