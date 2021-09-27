// @ts-nocheck

const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: path.resolve(__dirname, 'index.ts'),
    target: 'node',
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    externalsPresets: {
        node: true, // in order to ignore built-in modules like path, fs, etc.
    },
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
        filename: 'test.bin.js',
        path: path.resolve(__dirname),
    },
    mode: 'development', // set to development when debugging
    devtool: 'source-map',
};
