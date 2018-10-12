const path = require('path'), // 路径函数
    webpack = require('webpack')
    baseConfig = require('./webpack.base');
    merge = require('webpack-merge'),
    cleanWebpackPlugin = require('clean-webpack-plugin'),
    htmlWebpackPlugin = require('html-webpack-plugin'), // 页面打包    
    ExtractTextPlugin = require('extract-text-webpack-plugin'), // webpack4 使用@next版本
    MiniCssExtractPlugin = require('mini-css-extract-plugin'); 

process.env.NODE_ENV = 'prod';
module.exports = merge({
    mode: 'development', // development/production
    entry: {
        app: './src/js/index.js',
        app2: './src/js/app2.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name]-[chunkhash:8].js',
        publicPath: ''
    },
    devtool: 'cheap-map', // inline-source-map/cheap-map
    optimization: {
        splitChunks: {
            chunks: 'initial',
            cacheGroups: {
                vendors: {
                    test: /node_modules/,
                    minChunks: 1,
                },
                commons: {
                    name: 'common',
                    enforce: true,
                    minChunks: 3
                },
            }
        },
        runtimeChunk: {
            name: 'manifest'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': 'prod'
        }),
        new cleanWebpackPlugin(['dist/*']), 
        // 优化插件, 提取引用
        /* new webpack.optimize.CommonsChunkPlugin({
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
        }), */
        /* new webpack.optimize.CommonsChunkPlugin({
            name: 'app',
            async: 'vendor-async',
            children: true,
            minChunks: 3
        }), */
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true, // 注入 head, body css和js
            title: ' webpack4的设置',
            x: 'xxx', // 自定义属性
            minify: { //打包后压缩
                removeComments: true, // 打包后删除注释
                collapseWhitespace: true // 打包后删除空格
            },
            // chunks: ['app'], // 包含
            excludeChunks: [], // 剔除
            chunksSortMode: "dependency", // 生成manifest的js排序问题
            // inlineSource: '.(js|css)$' //js|css全部内嵌进打包页面从而减少http请求(提高加载性能)
        }),
        // keep module.id stable when vendor modules does not change
        new webpack.HashedModuleIdsPlugin(),
        // new MiniCssExtractPlugin({filename: 'css/[name]-[hash:8].css'}), // css单独文件提取
        new ExtractTextPlugin({filename: 'css/[name]-[hash:8].css'}), // css单独文件提取
        // new htmlWebpackInlineSourcePlugin() // js/css内置html，配合htmlWebpackPlugin的inlineSource使用
    ],
    module: {
        rules: [
           /*{
                test: /\.css$/,// 匹配特定文件的正则表达式或正则表达式数组
                // 应用于模块的 loader 使用列表
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.scss$/,// 匹配特定文件的正则表达式或正则表达式数组
                // 应用于模块的 loader 使用列表
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            }, */
            {
                test: /\.css$/,// 匹配特定文件的正则表达式或正则表达式数组
                // 应用于模块的 loader 使用列表
                use: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader!postcss-loader'}),
            },
            {
                test: /\.scss$/,// 匹配特定文件的正则表达式或正则表达式数组
                // 应用于模块的 loader 使用列表
                use: ExtractTextPlugin.extract({fallback: 'style-loader', use: [{loader: 'css-loader', options: {minisize: true}}, 'postcss-loader', 'sass-loader']}),
            },
        ]
    }
}, baseConfig);