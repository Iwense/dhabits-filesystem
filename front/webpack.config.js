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
    entry: ['@babel/polyfill','./src/index.tsx'],
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
            __VERSION__: JSON.stringify(gitRevisionPlugin.version()),
            __COMMITHASH__: JSON.stringify(gitRevisionPlugin.commithash()),
            __BRANCH__: JSON.stringify(gitRevisionPlugin.branch()),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(css)$/i,
                use: ["style-loader", 'css-loader']
            },
            {
                test: /\.svg$/,
                exclude: /node_modules/,
                use: "svg-react-loader"
            },
            {
                test: /\.(jpg|jpeg|png)$/i,
                use: ["file-loader"]
            },
            
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader',

            },
            {
                test: /\.tsx$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
        ]                // [
            //     {
            //         loader : "ts-loader",
            //         options: { 
            //             presets: ["@babel/preset-react","@babel/preset-env"]
            //         }
            //     }
            // ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.ts', '.tsx'],
      }
}