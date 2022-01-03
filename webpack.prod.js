const { merge } = require('webpack-merge');
const common = require('./webpack.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',

    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin({}), new TerserWebpackPlugin({})]
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new WorkboxWebpackPlugin.GenerateSW(),
    ]
})
