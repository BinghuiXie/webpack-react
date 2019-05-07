const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'js/app.js'
  },
  module: {
    rules: [
      // react 语法的处理
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        }
      },
      // css 文件的处理
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      // scss 文件的处理
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      // 图片的配置
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              // 指定路径
              name: 'resource/[name].[ext]'
            }
          }
        ]
      },
      // 字体图标的配置
      {
         test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
         use: [
           {
             loader: 'url-loader',
             options:{
               limit: 8192,
               // 输出到 resource 目录下面，[name] 表示文件名字还是对应的文件名，[ext] 表示后缀名也不变
               name: 'resource/[name].[ext]'
             }
           }
         ]
       }
    ]
  },
  plugins: [
    // 处理 html 文件
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    // 参数是输出的路径
    // 独立 css 文件
    // 输出到 dist/css 文件下面的文件中，文件名不变
    new ExtractTextPlugin("css/[name].css"),
    // 提出公共模块
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      // 输出到 js文件夹下面 base.js 文件中
      filename: 'js/base.js'
    })
  ],
  devServer: {
    port: 8086
  },
};