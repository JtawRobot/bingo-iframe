const webpack = require('webpack');
const withImages = require('next-images');

module.exports = withImages({
  images: {
    disableStaticImages: true,
  },
  webpack(config, options) {
    config.plugins.push(
      new webpack.ProvidePlugin({
        React: 'react',
      }),
    );
    return config;
  },
  publicRuntimeConfig: {
    CONTENTFUL_SPACEID: process.env.CONTENTFUL_SPACEID,
    CONTENTFUL_ENVIRONTMENTID: process.env.CONTENTFUL_ENVIRONTMENTID,
    CONTENTFUL_ACCESSTOKEN: process.env.CONTENTFUL_ACCESSTOKEN,
  },
});
