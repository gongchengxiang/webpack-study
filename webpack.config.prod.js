const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config.base.js');
module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups:{
        fontawesome:{
          test: /font-awesome/,
          chunks: "all",
          minSize: 0
        }
      }
    }
  },
});