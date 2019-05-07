webpack自己配置
---------------------------
官方文档：!(https://webpack.js.org/guides/development)[] === 英文文档     
中文文档：!(https://www.webpackjs.com/concepts/)[]
所有的插件的以来都使用 yarn 进行安装
- 需要处理的文件类型
    - html文件 => html-webpack-plugin
        可以生成单独的 html 文件，还可以把对应的脚本和样式自动插入对应的位置
    - 脚本处理 => 项目中针对的是 ES6 和 React
        ES6 => babel 相关插件 (babel-core + babel-loader + babel-preset-env)
        React => babel-preset-react 处理 react 语法
    - 样式
        - .css
            css-loader
        - .scss
            scss-loader + node-scss
    - 图片 / 字体等静态资源
        - url-loader + file-loader

- webpack常用插件(模块)
    - html-webpack-plugin => 组织 .ejs 文件，加工后生成一个可以在浏览器里面运行的文件
    - extract-text-webpack-plugin => 样式文件提取出来，单独打包成文件
    - CommonsChunkPlugin => 提取模块中的公用部分, webpack 自带
    - webpack-dev-server => 为 webpack 项目提供 web 服务 (通过监听文件的改动，自动刷新页面, 代理(路由拦截或者转发，只是在当前项目里生效))
    
- 开始搭建
    - 安装 node, yarn, git等
    - 新建目录(或者在线上新建一个仓库然后 clone 下来), 运行 **yarn init**  创建一个 package.json 文件 **(这一步是必须的，否则 webpack 安装不上去)**
    - 安装 webpack, 运行命令 **yarn add webpack@3.10.0 --dev**
    - 配置
        - 新建文件 **webpack.config.js** ，这个就是 webpack 的配置文件，粘贴下面代码进入文件(官网给的代码)
            ```javascript
              const path = require('path');
              
              // 导出一个模块(一个 json 配置对象)
              module.exports = {
                // 入口文件
                entry: './src/app.js',
                // 输出的文件
                output: {
                  // 通过 webpack 打包的文件最后要放到什么位置，默认为 dist 文件夹
                  path: path.resolve(__dirname, 'dist'),
                  filename: 'app.js'
                }
              };
            ```
            **运行 node_modules/.bin/webpack 进行打包** 查看效果
            至此完成最基本的 webpack 文件，即打包一个 js 文件出来
        - html 配置 => html-webpack-plugin
            > HtmlWebpackPlugin简化了 HTML 文件的创建，以便为你的webpack包提供服务
            - 安装插件
                **yarn add html-webpack-plugin@2.30.1 --dev**
            - 配置
                在 webpack.config.js 文件下面新增 plugins 属性进行如下配置：
                ```javascript
                const path = require('path');
                const HtmlWebpackPlugin = require('html-webpack-plugin');
                              
                  // 导出一个模块(一个 json 配置对象)
                  module.exports = {
                    // 入口文件
                    entry: './src/app.js',
                    // 输出的文件
                    output: {
                      // 通过 webpack 打包的文件最后要放到什么位置，默认为 dist 文件夹
                      path: path.resolve(__dirname, 'dist'),
                      filename: 'app.js'
                    },
                    plugins: [new HtmlWebpackPlugin()]
                  };
                ```
            - 打包测试 **运行 node_modules/.bin/webpack 进行打包**
                这将会产生一个包含以下内容的文件 dist/index.html：**(生成一个默认的 html 模板文件)**
                ```html
                <html>
                  <head>
                    <meta charset="UTF-8">
                    <title>webpack App</title>
                  </head>
                  <body>
                    <script src="index_bundle.js"></script>
                  </body>
                </html>
                ```
            - 配置自己的 html 模板文件(自己指定模板)
                所有的配置选项见：!(https://github.com/jantimon/html-webpack-plugin#configuration)[]
                自定义 template (配置选项之一)
                ```javascript
                    module.exports({
                      // ...... 省略前面的配置
                      plugins: [
                        new HtmlWebpackPlugin({
                          template: './src/index.html' // src 下面新建一个 index.html 文件，作为自定义的模板
                        })
                      ]
                    })
                ```
                可以 **运行 node_modules/.bin/webpack 进行打包** 看效果
        
        - 脚本配置
            - ES6
                - 安装 babel-core + babel-loader + babel-preset-env
                    **yarn add babel-core@6.26.0 babel-loader@7.1.2 babel-preset-env@1.6.1 --dev**
                - 配置方法：
                    > 在 webpack 配置对象中，需要添加 babel-loader 到 module 的 loaders 列表中
                    ```javascript
                    module.exports({
                      // ....
                      module: {
                        rules: [
                          {
                            // 对 js 进行处理
                            test: /\.js$/,
                            exclude: /(node_modules)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: ['env']
                              }
                            }
                          }
                        ]
                      }
                    })
                    ```
                - 装好以后就可以在 package.json 文件中看到安装好的依赖了
                - 安装好 babel 的插件以后就可以解析 ES6 的语法了 
                - **运行 node_modules/.bin/webpack** 进行打包可以看到 ES6 语法被转换成了 ES5 的语法
            - React 
                - 安装： babel-preset-react
                    **yarn add babel-preset-react@6.24.1 --dev**
                - 配置
                    在前面的对 js 处理的配置的 presets 中加入 react 就可以了
                    ```javascript
                    module.exports({
                      // ....
                      module: {
                        rules: [
                          {
                            // 对 js 进行处理
                            test: /\.js$/,
                            exclude: /(node_modules)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                // 可以对 react 进行处理
                                presets: ['env', 'react']
                              }
                            }
                          }
                        ]
                      }
                    })
                    ```
                - 在已有项目中添加 react 环境
                    **yarn add react@16.2.0 react-dom@16.2.0**
                    app.js 文件写入 react 代码
                    ```javascript
                        import React from 'react'
                        import ReactDOM from 'react-dom'
                        
                        ReactDOM.render(
                        <h1>hello react</h1>,
                        document.getElementById('app')
                        )
                    ```
                    **运行 node_modules/.bin/webpack** 打包编译，编译后的 app.js 会变得很长
    - 样式配置
        - css
            - >为了从 JavaScript 模块中 import 一个 CSS 文件，你需要在 module 配置中 安装并添加 style-loader 和 css-loader：
            - 安装： **yarn add style-loader@0.19.1 css-loader@0.28.8 --dev**
            - 配置：
                ```javascript 1.8
                module.exports({
                  module: {
                    rules: [
                        // css 文件的处理
                        {
                          test: /\.css$/,
                          use: [
                            'style-loader',
                            'css-loader'
                          ]
                        }
                      ]
                    }
                })
                ```
            - 测试：
                src 文件夹下新建 index.css 文件，随便写进去点样式
                在 app.js 中引入 css 文件 `import './index.css'`
                **运行 node_modules/.bin/webpack** 打包编译，可以看到加了样式后的结果 
            - 提取：将样式独立的提取到一个 css 文件中
                - ExtractTextWebpackPlugin
                > 它会将所有的入口 chunk(entry chunks)中引用的 *.css，移动到独立分离的 CSS 文件。
                    因此，你的样式将不再内嵌到 JS bundle 中，而是会放到一个单独的 CSS 文件（即 styles.css）当中。 
                    如果你的样式文件大小较大，这会做更快提前加载，因为 CSS bundle 会跟 JS bundle 并行加载。
                - 安装
                    **yarn add extract-text-webpack-plugin@3.0.2 --dev**
                - 配置：
                    将原来的配置 css 的 use 替换为下面的代码
                    ```
                        // 记得引入该插件
                        const ExtractTextPlugin = require('extract-text-webpack-plugin');
                        use: ExtractTextPlugin.extract({
                          fallback: "style-loader",
                          use: "css-loader"
                        })
                        
                        // 在 plugins 下面创建一个实例
                        // index.css 表示样式输出文件
                        new ExtractTextPlugin("index.css")
                    ```
        - sass
            - 安装 sass-loader 和 node-sass
                **yarn add sass-loader@6.0.6 node-sass@4.7.2 --dev**
            - 配置：
                ```
                    // 添加到 rules 下面
                    {
                        test: /\.scss$/,
                        use: ExtractTextPlugin.extract({
                            fallback: 'style-loader',
                            use: ['css-loader', 'sass-loader']
                        })
                    }
                ```
            - 测试
                src 目录下新建一个 index.scss 文件，写入一些样式
                在 src/index.html 下引入 index.scss
                **运行 node_modules/.bin/webpack** 打包看样式有没有发生变化 
    
    - 图片 / 字体 等一些静态资源的打包处理
        - 图片
            - 安装
                **yarn add file-loader@1.1.6 url-loader@0.6.2 --dev**
            - 配置
                ```
                    {
                        // 处理 png jpg gif 文件
                        test: /\.(png|jpg|gif)$/i,
                        use: [
                            {
                                loader: 'url-loader',
                                options: {
                                    limit: 8192
                                }
                            }
                        ]
                    }
                ```
            - 测试
                src/index.html 文件下添加一张图片
                **运行 node_modules/.bin/webpack** 打包查看图片是否显示在页面上
        - 字体
            - font awesome
                - 安装
                    **yarn add font-awesome**
                    安装后可以在 mode_modules 里面找到
                - 使用
                    - 引入
                        import 'font-awesome'
                        import 'font-awesome/css/font-awesome.min.css'
                    - webpack 配置
                        ```
                           {
                            // 字体图标的配置
                             test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                             use: [
                               {
                                 loader: 'url-loader',
                                 options:{
                                   limit: 8192
                                 }
                               }
                             ]
                           }
                        ```
                    - 使用字体
                        ```html
                          <i className="fa fa-address-book"></i>
                        ```
                    - 查看
                        打开 src/index.html 可以看到出现了图标
    
    - 提取通用的模块 => CommonsChunkPlugin => webpack 自带，不需要安装
        - 配置
            plugins 下面添加下面的配置选项
                // 引入 webpack
                **const webpack = require("webpack");**
                **new webpack.optimize.CommonsChunkPlugin({
                    name: 'common',
                    // 通用的东西打包生成一个 js 文件，输出到 filename 指定的路径(base.js)中
                    filename: 'base.js'
                })**
    - 优化 => 文件结构划分
        - js 类的
            - (原) **filename: 'base.js'** => (优化后) **filename: 'js/base.js'**
            - (原) output 下面的 **filename: 'app.js'** => (优化后) **filename: 'js/app.js'**
            - (原) filename: 'base.js' => (优化后) filename: 'js/base.js'
        - css 类的
            - (原) **new ExtractTextPlugin("index.css")** => (优化后) **new ExtractTextPlugin("css/[name].css")** // name 表示按照原文件的名称打包输出
        - 图片
            (原)
              {
                test: /\.(png|jpg|gif)$/i,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192
                    }
                  }
                ]
              },
            (现)
              {
                test: /\.(png|jpg|gif)$/i,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192,
                      // 加一个 name 字段就是指定路径的 => 输出到 resource 文件夹下
                      // [name]表示按照原文件名打包输出
                      // [ext]表示文件扩展名不变
                      **name: 'resource/[name].[ext]'**
                    }
                  }
                ]
              },
              
    - 热更新 => webpack-dev-server + 配置
        - 安装 webpack-dev-server
            **yarn add webpack-dev-server@2.9.7 --dev**
        - 配置 webpack.config.js
            devServer: {
                port: 8086 // 配置项目启动端口为 8086 端口
            },
        - 安装好以后可以通过 **node_modules/.bin/webpack-dev-server** 启动该命令
        - 在 package.json 里进行最后的配置
            在与 license 同级的地方添加一个 scripts 配置，配置项如下：
                **"scripts": {
                    "dev": "node_modules/.bin/webpack-dev-server"
                }**
            - 这样的话可以直接使用 **yarn run dev** 就可以跑起来了
        
        
            