const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  target: 'web',
  entry:{
    index: path.resolve(__dirname, 'src/index.js')
  },
  output:{
    path: path.resolve(__dirname,'dist'),
    filename: 'assets/js/[name]-[chunkhash:8].js',
    chunkFilename:'assets/js/[name]-[chunkhash:8].js',
    // publicPath: './'
    publicPath: '/webpack-study/'
  },
  module:{
    rules:[
      {
        test: /\.js$/,
        include: /src/,
        use: { loader: 'babel-loader' }
      },
      {
        test: /\.css$/,
        include: /src/,
        use:[ 
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../../', // output 中的publicPath 采用相对路径时才需要这样确定css中url资源位置，生产环境不建议使用相对路径
            },
          },
          'css-loader',
          'postcss-loader',
        ]
      },
      {
        test: /\.scss$/,
        include: /src/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../../', // output 中的publicPath 采用相对路径时才需要这样确定css中url资源位置，生产环境不建议使用相对路径
            },
          },
          'css-loader', 
          'sass-loader',
          'postcss-loader'
        ],
      },
      {
        test: /\.(gif|jpg|jpeg|png|webp|svg)$/,
        include: /src/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'assets/img/[name]-[hash:8].[ext]',
              limit: 1024 * 8
            }
          },
        ],
      },
      {
        test: /fonts[\\/]\S+\.(woff|woff2|eot|ttf|svg)$/,
        include: /src/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/fonts/[name]-[hash:8].[ext]',
          }
        },
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name]-[contenthash:8].css',
      chunkFilename: 'assets/css/[name].[contenthash:8].css',
    }),
    new HtmlWebpackPlugin({
      template: 'src/template/index.html',
      filename: `index.html`,
      inject: 'body',
      favicon: 'src/template/favicon.ico',
      title: 'webpack study',
      // cdn:{
      //   js:[
      //     { url:'https://cdn.bootcdn.net/ajax/libs/vue/2.6.12/vue.js', defer:'defer' },
      //     { url:'https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js', }
      //   ],
      //   css:[]
      // }
    }),
    new CleanWebpackPlugin()
  ],
  resolve:{
    extensions: [".js", ".json", ".jsx"], // import模块可以不写后缀，会按照这个顺序尝试自动补全，建议写上后缀
    alias:{ //给指定文件夹起一个别名
      // '@js':'src/js',
      '@img':path.join(__dirname, 'src/img')
    }
  },
  // externals:{
  //   vue: 'Vue',
  // }
}