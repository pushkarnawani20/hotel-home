/* eslint-disable global-require */
const tailwindcss = require('tailwindcss');

module.exports = {
  // eslint-disable-next-line import/no-extraneous-dependencies
  plugins: [tailwindcss('./tailwind.config.js'), require('autoprefixer')],
};
