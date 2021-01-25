const path = require('path');
const { merge } = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config.base.js');
const TerserPlugin = require('terser-webpack-plugin');
module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  optimization: {
    emitOnErrors: true, // 在编译时每当有错误时暴露出来
    sideEffects: true, // false:不处理多余引用, true:处理多余引用，根据package.json里面sideEffects决定处理，sideEffects:['*.css']表示不要清理css
    minimize: true,
    minimizer:[
      new TerserPlugin({
        extractComments: false,
        parallel: true,
        terserOptions: {  
          output: {
            comments: false
          },
          compress: {
            drop_console:true,
            drop_debugger:true,
          },  
        },
      }),
    ],
    /* 加上这个runtimeChunk会多生成一个runtime文件，本来默认这个文件是被放在indexChunk（入口chunk）里面的，
    抽离出来后，如果异步加载的模块变了的话，runtime文件和异步文件的hash会变，而indexChunk不变，在indexChunk比较大的时候，这个很有用 */
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      cacheGroups:{
        vendors: {
          // test: (module) => {
          //   const exceptModules = ['vue'];
          //   const modulePath = `${module.resource}`;
          //   if(modulePath.indexOf('node_modules')>-1){
          //     if(exceptModules.every(e=>modulePath.indexOf(e)===-1)){
          //       return true;
          //     }
          //   }
          // },
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          minChunks: 1,
          name: 'vendors',
          reuseExistingChunk: true,
          priority: 0,
          enforce: true, // 上述请求数，大小统统不生效，就按改规则打包
        },
        default: {
          minChunks: 2,
          priority: -1,
          reuseExistingChunk: true
        },
        corejs: {
					test: /[\\/]node_modules[\\/](core-js)/,
					chunks: 'all',
					name: 'corejs',
					reuseExistingChunk: true,        
					priority: 9,
        },
        vuepackage:{
          test: /[\\/]node_modules[\\/](vue|vuex)/,
          chunks: 'all',
          name: 'vuepackage',
          reuseExistingChunk: true,
          priority: 8,
        },
        fontawesome:{
          test: /font-awesome\.min\.css/,
          chunks: "all",
          name: 'fontawesome',
          // enforce: true // enforce和minSize二选一，都可以强制抽出来包
          minSize: 0,
        },
        testgcxcss: {
          test: /testgcx\.css/,
          chunks: "all",
          name: 'testgcxcss',
          // enforce: true
          minSize: 0,
        }
      }
    },
  },
});