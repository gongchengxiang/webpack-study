const path = require('path');
const { merge } = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config.base.js');
module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  // devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
});