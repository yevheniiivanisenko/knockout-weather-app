const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('dotenv').config();

module.exports = {
    entry: './app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            minify: {
                collapseWhitespace: true,
                removeEmptyAttributes: true
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                API: JSON.stringify(process.env.API),
                API_HOST: JSON.stringify(process.env.API_HOST),
                API_KEY: JSON.stringify(process.env.API_KEY)
            }
        })
    ]
};
