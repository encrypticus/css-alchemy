const path = require('path');

module.exports = () => {
  return {
    resolve: {
      alias: {
        '#components': path.resolve(__dirname, '../../../themes/alchemy/layout/components'),
        '#blocks': path.resolve(__dirname, '../../../themes/alchemy/layout/blocks'),
      }
    }
  }
};
