const webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    cleanWebpackPlugin = require('clean-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin'), // 压缩css
    UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin'), // js 压缩
    VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = {
    mode: 'development', // development / production
    entry: {
        app: './src/main.js'
    },
    output: {
        path: `${__dirname}/dist`,
        filename: 'js/[name]-[hash].js'
    },
    // devtool: '#source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
        port: 8081
    },
    optimization: {
        splitChunks: {
            chunks: 'initial',
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    test: /node_modules/,
                    minChunks: 1,
                },
                commons: {
                    name: 'common',
                    enforce: true,
                    minChunks: 2
                },
            }
        },
        runtimeChunk: {
            name: 'manifest'
        }
    },
    plugins: [
        new cleanWebpackPlugin(['dist/*']),
        new VueLoaderPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        new MiniCssExtractPlugin({filename: 'css/style.css'}),
        new OptimizeCSSPlugin(),
        new UglifyjsWebpackPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
            inject: true,
            // chunk: 'dependency'
        })
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    transformToRequire: {
                        video: 'src',
                        source: 'src',
                        img: 'src',
                        image: 'xlink:href'
                    },
                    loaders: {
                        css: [MiniCssExtractPlugin.loader, 'css-loader'],
                        scss: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
                    }
                }
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                include: [__dirname + '/src']
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['vue-style-loader' ?MiniCssExtractPlugin.loader: 'vue-style-loader', {loader: 'css-loader', options: {
                    sourceMap: true,
                    modules: true,
                    // customize generated class names
                    localIdentName: '[local]_[hash:base64:8]'
                }}, 'sass-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: './dist/img/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.css', '.scss'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': './src',
        }
    }
};