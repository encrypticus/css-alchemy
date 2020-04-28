module.exports = {
  plugins: [
    'stylelint-order'
  ],
  rules: {
    'order/properties-order': [
      {
        'properties' : [
          'display',
          'position',
          'content',
          'top',
          'right',
          'bottom',
          'left',
          'z-index',
          'float',
          'width',
          'height',
          'margin',
          'padding',
          'font',
          'font-size',
          'font-family',
          'font-style',
          'font-weight',
          'line-height',
          'background-color',
          'color',
          'text-align',
          'border',
          'border-radius',
          'opacity'
        ]
      },
    ],
    'color-hex-length': 'short',
    'string-quotes': 'single'
  }
};

