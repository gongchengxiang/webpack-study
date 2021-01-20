const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config.base.js');
const TerserPlugin = require('terser-webpack-plugin');
module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  optimization: {
    minimize: false,
    // minimizer:[
    //   new TerserPlugin({
    //     cache: true,
    //     parallel: true,
    //   }),
    // ],
    
    /* 加上这个runtimeChunk会多生成一个runtime文件，本来默认这个文件是被放在indexChunk里面的，
    抽离出来后，如果异步加载的模块变了的话，runtime文件和异步文件的hash会变，而indexChunk不变，在indexChunk比较大的时候，这个很有用 */
    // runtimeChunk: { 
    //   name: 'runtime'
    // },
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