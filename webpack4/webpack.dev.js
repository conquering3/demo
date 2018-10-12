const path = require('path'), // 路径函数
    webpack = require('webpack')
    merge = require('webpack-merge'),
    baseConfig = require('./webpack.base'),
    htmlWebpackPlugin = require('html-webpack-plugin'), // 页面打包    
    ManifestPlugin = require('webpack-manifest-plugin'); // 生成文件路径收集数据

module.exports = merge({
    mode: 'development', // production    
    output: {
        path: path.resolve(__dirname, 'static'),
        filename: 'js/[name]-[hash:8].js',
        publicPath: ''
    },
    devServer: {
        contentBase: './static',
        hot: true,
        inline: true
    },
    devtool: 'inline-source-map', // inline-source-map/cheap-map    
    plugins: [
        new ManifestPlugin(),
        // 热更新和chunkhash发生冲突, 
        new webpack.NamedModulesPlugin(), // 保持hash值不变,更改时，提供热更新变换
        new webpack.HotModuleReplacementPlugin(), 
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true, // 注入 head, body css和js
            title: ' webpack4的设置',
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
    ],
    module: {
        rules: [
            {
                // 热更新刷新不能使用 ExtractTextPlugin
                test: /\.css$/,// 匹配特定文件的正则表达式或正则表达式数组
                use: ['style-loader', 'css-loader']
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
        ]
    }
}, baseConfig);