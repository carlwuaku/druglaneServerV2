const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: './src/preload/preload.ts',
    target: 'node',
    externals: [nodeExternals()],

    resolve: {
        alias: { ['@']: path.resolve(__dirname, 'src/preload') },
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [{
            test: /\.ts$/,
            include: [path.resolve(__dirname, 'src/preload')]
           ,
            use: [{ loader: 'ts-loader' }],
        }]
    },
    output: {
        path: __dirname + '/dist',
        filename: 'preload.js'
    }
}