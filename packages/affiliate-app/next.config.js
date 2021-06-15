const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const path = require('path');
const withImages = require('next-images');
const withPWA = require('next-pwa');
const extendConfigWithSass = withCSS(withSass());
const extendedConfigWithImages = withImages(extendConfigWithSass);

// A wrapper so we can define custom webpack config to play nicely with
// next config defined in node_modules
const webpackWrapper = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      // Custom config
      config.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      });

      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
        exclude: /node_modules/,
      });

      config.module.rules.push({
        test: /\.png$/,
        use: ['url-loader'],
        exclude: /node_modules/,
      });

      // custom alias
      config.resolve.alias['@modules'] = path.join(__dirname, './components/modules');
      config.resolve.alias['@units'] = path.join(__dirname, './components/units');
      config.resolve.alias['@document'] = path.join(__dirname, './document');
      config.resolve.alias['@styles'] = path.join(__dirname, './styles');
      config.resolve.alias['@layouts'] = path.join(__dirname, './layouts');
      config.resolve.alias['@helpers'] = path.join(__dirname, './helpers');
      config.resolve.alias['@images'] = path.join(__dirname, './images');
      config.resolve.alias['@containers'] = path.join(__dirname, './containers');
      config.resolve.alias['@cmsContext'] = path.join(__dirname, './app/CmsContext');
      config.resolve.alias['@types'] = path.join(__dirname, './types');
      config.resolve.alias['@constants'] = path.join(__dirname, './constants');
      config.resolve.alias['@hooks'] = path.join(__dirname, './hooks');
      config.resolve.alias['@config'] = path.join(__dirname, './config');
      config.resolve.alias['@server'] = path.join(__dirname, './server');

      return nextConfig.webpack(config, options);
    },
  });
};

module.exports = withPWA({
  ...webpackWrapper(extendedConfigWithImages),
  pwa: {
    dest: 'public',
  },
});
