const path = require('path'), // 路径函数
    webpack = require('webpack'),
    htmlWebpackPlugin = require('html-webpack-plugin'), // 页面打包
    cleanWebpackPlugin = require('clean-webpack-plugin'),// 清理工具 new cleanWebpackPlugin(['dist'])
    ExtractTextPlugin = require('extract-text-webpack-plugin'), // 合并样式文件
    UglifyJSPlugin = require('uglifyjs-webpack-plugin'), // 压缩js代码
    htmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin'); // css/js内嵌工具;

module.exports = {
    entry: {
        app: './src/js/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name]-[chunkhash:8].js',
        publicPath: ''
    },
    devtool: 'cheap-map',
    devServer: {
        contentBase: './static',
        hot: true,
        inline: true
    },
    plugins: [
        new cleanWebpackPlugin(['dist/*']), 
        // 优化插件, 提取引用
        new webpack.optimize.CommonsChunkPlugin({
            names: 'vendor',
            minChunks (module) {
                return module.resource 
                    && /\.js$/.test(module.resource) 
                    && module.resource.indexOf(path.join(__dirname, './node_modules')) === 0;
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'app',
            async: 'vendor-async',
            children: true,
            minChunks: 3
        }),
        // keep module.id stable when vendor modules does not change
        new webpack.HashedModuleIdsPlugin(),
        new ExtractTextPlugin('css/app-[hash:8].css'), // css单独文件提取
        new UglifyJSPlugin(), // 压缩
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true, // 注入 head, body css和js
            title: ' webpack3的设置',
            x: 'xxx', // 自定义属性
           /*  minify: { //打包后压缩
                removeComments: true, // 打包后删除注释
                collapseWhitespace: true // 打包后删除空格
            }, */
            // chunks: ['app'], // 包含
            excludeChunks: [], // 剔除
            chunksSortMode: "dependency", // 生成manifest的js排序问题
            // inlineSource: '.(js|css)$' //js|css全部内嵌进打包页面从而减少http请求(提高加载性能)
        }),
        new webpack.NamedModulesPlugin(),
        // new webpack.HotModuleReplacementPlugin(), // 热更新和chunkhash发生冲突
        // new htmlWebpackInlineSourcePlugin() // js/css内置html，配合htmlWebpackPlugin的inlineSource使用
    ],
    module: {
        rules: [
            {// 转译js文件 es6
                test: /\.js$/,// 匹配特定文件的正则表达式或正则表达式数组
                include: path.resolve(__dirname, 'src'),// 指定需要转译的文件夹
                exclude: path.resolve(__dirname, 'node_modules'),// 指定转译时忽略的文件夹        
                use: {
                    loader: 'babel-loader', // 依赖的loader
                }
            },
            /* {
                test: /\.css$/,// 匹配特定文件的正则表达式或正则表达式数组
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader', 
                    use: [
                        {loader: 'css-loader', options: {importLoaders: 1}},
                        {loader: 'postcss-loader', options: {plugins:[require("autoprefixer")("last 100 versions")]}}
                    ]})
            }, */
            {
                // 刷新不能使用 ExtractTextPlugin
                test: /\.css$/,// 匹配特定文件的正则表达式或正则表达式数组
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            /* {
                test: /\.scss$/,// 匹配特定文件的正则表达式或正则表达式数组
                // 应用于模块的 loader 使用列表
                use: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader!postcss-loader!sass-loader'}),
            }, */
            {
                test: /\.scss$/,// 匹配特定文件的正则表达式或正则表达式数组
                // 应用于模块的 loader 使用列表
                use: ['style-loader', 'css-loader', 'postcss-loader','sass-loader'],
            },
            {// 处理写在css中的图片
                test: /\.(png|jpg|gif|svg)$/i,
                use: [
                    {
                        // 将图片处理成base64时候使用
                        loader: 'url-loader',
                        // loader: 'file-loader', 
                        options: {
                            // 小于8k的图片处理成64编码，大于就交给file-loader处理
                            limit: 8192,
                            // 图片打包后存在assets文件下[名称]-[5位哈希值].[自身文件类型]
                            name: 'assets/[name]-[hash:5].[ext]'
                        }
                    },
                    {// 压缩图片 右左顺序放到最前面
                        loader: 'image-webpack-loader'
                    }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'media/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    }
}