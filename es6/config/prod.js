let webpack = require('webpack'),
    baseConfig = require('./webpack-base-config'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    merge = require('webpack-merge'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

let config = {
    devtool: '#source-map',
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            }
        })
    ]
};

module.exports = merge(baseConfig, config);
