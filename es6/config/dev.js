let webpack = require('webpack'),
    path = require('path'),
    baseConfig = require('./webpack-base-config'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    merge = require('webpack-merge'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    portfinder = require('portfinder');

let config = {
    target: 'web',
    output: {
        publicPath: '/'
    },
    devServer: {
        contentBase: false, // 不要这个目录, 自动注入，依赖当前的index.html
        historyApiFallback: true,
        inline: true,
        hot: false, // 会和模块重叠
        host: 'localhost',
        port: 8081,
        open: false,
        overlay: { warnings: false, errors: true }
        
    },
    devtool: '#cheap-eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin() // https://github.com/ampedandwired/html-webpack-plugin
    ]
};

module.exports = merge(baseConfig, config);