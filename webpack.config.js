// @ts-nocheck

const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    entry: './src/FlexBrowserApp.ts',
    target: 'electron-renderer',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [new TsconfigPathsPlugin({})],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'app/js'),
    },
    // comment out compress to make development easier
    compress: {
        warnings: false,
        drop_console: true,
    },
    mode: 'production', // set to development when developing
    devtool: 'source-map',
};
