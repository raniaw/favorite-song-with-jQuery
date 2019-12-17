const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const htmlLoader = require('html-loader');
const webpack = require( 'webpack' );

const config = {
    //     entry: './src/scripts/index.js',
    //   output: {
    //     path: __dirname + '/dist'+'/scripts',
    //     filename: 'bundle.js'}, 
    mode: 'development',
    /**
     * ENTRY
     * @see https://webpack.js.org/concepts/#entry
     */
                   
    entry: { main:'./src/scripts/index.js'},
    output: {
        path: path.resolve(__dirname, 'dist',),
        filename: path.join('scripts', 'bundle.js')
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        hot: true,
        port: 9000
    },
    module: {
        rules: [
            // Scripts
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        sourceMaps: true
                    }
                }
            },
       
            {
                test: /\.html$/i,
                use: [{
                    loader: 'html-loader',
                    options: { minimize: true }
                }]
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
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true,
                        plugins: () => [autoprefixer()]
                    }
                }
                ]
            },
            // Images
            {
                test: /\.(jpg|jpe?g|gif)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        //name: 'images/[hash]-[name].[ext]',
                        name: '[name].[ext]',
                        outputPath: 'images/',
                        publicPath: '../images/'
                    }
                }]
            },
            {
                test: /\.png$/,
                use: [{
                   loader: "file-loader?mimetype=image/png",
                    options: {
                        //name: 'images/[hash]-[name].[ext]',
                        name: '[name].[ext]',
                        outputPath: 'images/',
                        publicPath: '../images/'
                    }
                }]
            },
            // Fonts
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/',
                        publicPath: '../fonts'
                    }
                }]
            },
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
    // htmlLoader: {
    //    // ignoreCustomFragments: [/\{\{.*?}}/],
    //     root: path.resolve(__dirname, 'images'),
    //     attrs: ['img:src', 'link:href']
    //   },
    plugins: [

        new CleanWebpackPlugin(),
        // new CleanWebpackPlugin(['dist']), 
        // new HtmlWebPackPlugin({
        //     template: './src/index.html',
        //     filename: './index.html'
        // }),

        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, './src', 'index.html'),
            filename: './index.html',
            stats: { children: false },
            hash: true
            //inlineSource: '.(js|css)$' // embed all javascript and css inline
        }),
       // new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css',
            chunkFilename: 'styles/chunks/[id].css'
        })
    ]
};



module.exports = (env, argv) => {
    if (argv.mode === 'development') {

        config.devtool = 'source-map';

    }

    return config;
};