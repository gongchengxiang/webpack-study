const path = require('path');
const { merge } = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config.base.js');
const TerserPlugin = require('terser-webpack-plugin');
module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  optimization: {
    emitOnErrors: true, // 在编译时每当有错误时暴露出来
    // moduleIds: 'named', // named:chunk名字带有模块名(貌似只有异步的起作用)， size：打包最小
    // chunkIds:'named', // 
    removeAvailableModules: true, // 如果模块已经包含在所有父级模块中，告知 webpack 从 chunk 中检测出这些模块，或移除这些模块
    removeEmptyChunks: true,
    // providedExports: true, // 配啥都好像不管用
    // usedExports: true, // 配啥都好像不管用
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
          test: (module) => {
            const exceptModules = ['vue'];
            const modulePath = `${module.resource}`;
            if(modulePath.indexOf('node_modules')>-1){
              if(exceptModules.every(e=>modulePath.indexOf(e)===-1)){
                return true;
              }
            }
          },
          chunks: 'all',
          minChunks: 1,
          name: 'vendors',
          reuseExistingChunk: true,
          priority: 10,
          enforce: true, // 上述请求数，大小统统不生效，就按改规则打包
        },
        default: {
          minChunks: 2,
          priority: -1,
          reuseExistingChunk: true
        },
        vuepackage:{
          test: /[\\/]node_modules[\\/](vue|vuex)/,
          chunks: 'all',
          name: 'vuepackage',
          reuseExistingChunk: true,
        },
        // fontawesome:{
        //   test: /css\/font-awesome\.min\.css/,
        //   chunks: "all",
        //   name:'fontawesome',
        //   reuseExistingChunk: true,
        //   enforce:true
        // },
      }
    },
  },
});