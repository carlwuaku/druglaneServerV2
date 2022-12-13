const path = require('path');
const { node } = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'development',
    entry: './src/main.ts',
    target: 'electron-main',
    externals: [nodeExternals()],

    resolve: {
        alias: { ['@']: path.resolve(__dirname, 'src') },
        extensions: ['.tsx','.ts','.js']
    },
    module: {
        rules: [{
            test: /\.ts$/,
            include: /src/,
            exclude: [path.resolve(__dirname, "src/server/")],
            use: [{ loader: 'ts-loader' }],
        }]
    },
    output: {
        path: __dirname + '/dist',
        filename: 'main.js'
    }
}