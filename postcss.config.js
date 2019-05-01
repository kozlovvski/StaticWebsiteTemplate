const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: [
    require('autoprefixer'),
    purgecss({
      content: ['./**/*.html']
    })
  ],
  browsers: ['> 0.25%', 'ie >= 11']
};
