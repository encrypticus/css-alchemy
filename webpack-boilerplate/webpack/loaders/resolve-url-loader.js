
const defaultOptions = {

};

module.exports = (options = defaultOptions) => {
  return {
    loader: 'resolve-url-loader',
    options
  }
}