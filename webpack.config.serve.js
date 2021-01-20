const path = require('path');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config.base.js');
module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  optimization: {
    minimize: true,
    // minimizer:[
    //   new TerserPlugin({
    //     cache: true,
    //     parallel: true,
    //   }),
    // ],
    
    /* 加上这个runtimeChunk会多生成一个runtime文件，本来默认这个文件是被放在indexChunk里面的，
    抽离出来后，如果异步加载的模块变了的话，runtime文件和异步文件的hash会变，而indexChunk不变，在indexChunk比较大的时候，这个很有用 */
    runtimeChunk: { 
      name: 'runtime'
    },
    splitChunks: {
      automaticNameDelimiter:'~',
      maxAsyncRequests:30,
      maxInitialRequests:30,
      maxSize: 1024 * 400,
      // maxAsyncSize:1024 * 200,
      cacheGroups:{
        vue: {
          test: /[\\/]node_modules[\\/](vue)[\\/]/,
          name: 'vue',
          chunks: 'all',
          priority: 1,
          reuseExistingChunk: true
        },
        vendors: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          priority: 0,
          name:'vendors',
          reuseExistingChunk: true
        },
        // vue:{
        //   test:/vue/,
        //   chunks: "all",
        //   minSize: 0
        // },
        fontawesome:{
          priority: 1,
          test: /font-awesome\.min\.css/,
          chunks: "all",
          minSize: 0,
          name:'fontawesome',
          reuseExistingChunk: true
        },
        
      }
    },
    moduleIds: 'size', // named:chunk名字带有模块名， size：打包最小
  },
});