let webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');
// babel-polyfill es6函数转换
let config = {
    entry: {
        app: ['babel-polyfill', path.resolve(__dirname, '../src/js/app.js')],
        app2: [path.resolve(__dirname, '../src/js/app2.js')]
    },
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name]-[hash:10].js',
        chunkFilename: 'js/[id].[chunkhash].js'
        
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'app',
            minChunks: 3
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            miniChunks: Infinity
        }),
        new ExtractTextPlugin({
            filename: 'css/[name]-[hash:10].css',
            allChunks: true /*是否将分散的css文件合并成一个文件*/
        }),
        new HtmlWebpackPlugin({
            title: 'hello',
            template: 'index.html',
            filename: 'index.html',
            inject: true
           /*  chunksSortMode: function (chunk1, chunk2) { // 模块排序
                let order = ['manifest', 'app2', 'app1'];
                let order1 = order.indexOf(chunk1.names[0]);
                let order2 = order.indexOf(chunk2.names[0]);
                return order2 - order1;
            } */
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src')
        },
        extensions: ['.js', '.json', '.css', '.scss']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /^node_modules$/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {loader: 'css-loader', options: {sourceMap: true, minimize: true}},
                        {loader: 'postcss-loader', options: {sourceMap: true, config: {path: 'postcss.config.js'}}}
                    ]
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {loader: 'css-loader', options: {sourceMap: true, minimize: true}},
                        {loader: 'postcss-loader', options: {sourceMap: true, config: {path: 'postcss.config.js'}}},
                        {loader: 'sass-loader', options: {sourceMap: true}}
                    ]
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
            },
            {
                test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
                use: 'file-loader?name=[name].[ext]'
            }
        ]
    }
};

module.exports = config;