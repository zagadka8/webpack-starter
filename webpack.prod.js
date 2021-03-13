const path = require('path');
const HtmlWebPackPlugin         = require('html-webpack-plugin');
const { loader }                = require('mini-css-extract-plugin');
const MinicssExtractPlugin      = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin   = require('optimize-css-assets-webpack-plugin');
const CopyPlugin                = require('copy-webpack-plugin'); 
const MinifyPlugin              = require('babel-minify-webpack-plugin');
const TerserPlugin              = require("terser-webpack-plugin");
 
module.exports = {
 
    entry: {
        index: './src/index.js',
        
    },
   
    mode: 'production',
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin()],
        minimize: true,
        minimizer: [new TerserPlugin({
            test: /\.js(\?.*)?$/i,
        })],
    },
    output: {
        filename: 'main.[contenthash].js',
        path    : path.resolve(__dirname, 'dist'),
        clean: true,
        
    },
    module: {
        rules:[
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                    presets: ['@babel/preset-env']
                    }
                }
            },    
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use: [
                    MinicssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    sources: false,
                    minimize: true,
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            }, 
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            title: 'Output Management',
            filename: './index.html'
        }),
        new MinicssExtractPlugin({
            filename: '[name].[contenthash].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets/'},
            ],
        }),
        new MinifyPlugin(),
    ],
}