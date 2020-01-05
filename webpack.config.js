const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const htmlLoader = require('html-loader');
const webpack = require('webpack');
const glob = require('glob');


const config = {
   

    mode: "development", // 
    entry: {
        style: './src/styles/main.css',

    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: path.join('styles', "[name].css"), // string

    },

    entry: {
        main: 'scripts/index.js',
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: path.join('scripts', 'bundle.js')

    },
    devtool: 'inline-source-map',

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        host: `localhost`,
        port: 9000
    },
    // publicPath: "/assets/", // string,
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
                    template: './src/index.html',
                    filename: './index.html'
                }),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css',
            chunkFilename: 'styles/chunks/[id].css'
        })
    ],
    module: {
        rules: [
            // Scripts
            
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            // Html 
            {
                test: /\.html$/,
                use: [
                    // apply multiple loaders and options
                  //  "htmllint-loader",
                    {
                        loader: "html-loader",
                        options: {
                            filename: '[name].[ext]'
                        }
                    }
                ]
            },
            // Styles
            {
                test: /\.css$|\.scss$/,
                use: [{
                    loader: 'style-loader'
                },
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'resolve-url-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                },
               
                ]
            },
            // Images
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            filename: '[name].[ext]',

                            outputPath: 'images'
                           
                        }
                    },

                ],
            },
           
            // Fonts
            // {
            //     test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            //     use: [{
            //         loader: 'file-loader',
            //         options: {
            //             name: '[name].[ext]',
            //             outputPath: 'fonts/',
            //             publicPath: '../fonts'
            //         }
            //     }]
            // },
            // Media 
            {
                test: /\.(mp3|mp4|wav|mpeg|ogg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'media/',
                        publicPath: '../media/'
                    }
                }]
            },
        ]
    },
    
};



module.exports = (env, argv) => {
    if (argv.mode === 'development') {

        config.devtool = 'source-map';

    }

    return config;
};