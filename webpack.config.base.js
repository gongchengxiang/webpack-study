const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports={
  entry:{
    index: path.resolve(__dirname,'src/index.js')
  },
  output:{
    path: path.resolve(__dirname,'dist'),
    filename: 'assets/js/[name]-[chunkhash:8].js',
    chunkFilename:'assets/js/[name]-[chunkhash:8].js',
    publicPath: './'
    // publicPath: '/webpack-study/'
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
        test: /\.(gif|jpg|png|webp)$/,
        include: /src/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'assets/img/[name]-[hash:8].[ext]',
              limit: 1024 * 15
            }
          },
        ],
      },
      {
        test: /\.(woff|woff2|svg|eot|ttf)$/,
        include: /src/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/fonts/[name]-[hash:8].[ext]',
            }
          },
        ],
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
      // chunks: ['index'],
      title: 'webpack study'
    }),
    new CleanWebpackPlugin(),
  ],
}