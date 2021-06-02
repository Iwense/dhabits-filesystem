const path = require('path')
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const {GitRevisionPlugin} = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin();

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const filename = () => isDev ? 'bundle.js' : 'bundle.[hash].js'

module.exports = {
    mode: 'development',
    entry: ['@babel/polyfill','./src/index.jsx'],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: filename(),
    },
    devServer: {
        port:3000,

    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./public/index.html"),
            filename: 'index.html'
        }),
        new CleanWebpackPlugin(),
        gitRevisionPlugin,
        new webpack.DefinePlugin({
            'VERSION': JSON.stringify(gitRevisionPlugin.version()),
            'COMMITHASH': JSON.stringify(gitRevisionPlugin.commithash()),
            'BRANCH': JSON.stringify(gitRevisionPlugin.branch()),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(css)$/i,
                use: ["style-loader", 'css-loader']
            },
            {
                test: /\.(jpg|jpeg|svg|png)$/i,
                use: ["file-loader"]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader : "babel-loader",
                        options: { 
                            presets: ["@babel/preset-env"]
                        }
                    }
                ]
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader : "babel-loader",
                        options: { 
                            presets: ["@babel/preset-react","@babel/preset-env"]
                        }
                    }
                ]
            },
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
      }
}