const path = require("path");
const nodeExternals = require('webpack-node-externals');
const {NODE_ENV = 'production'} = process.env;
module.exports = {
    entry: './src/server/server.ts',
    mode: NODE_ENV,
    externals: [nodeExternals()],
    target: 'node',
    resolve: {
        extensions: ['.ts','.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: [
                    path.resolve(__dirname, 'src/server'),
                    path.resolve(__dirname, 'src/utils')]
            }
        ]
    },
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname,'dist/server')
    },
    node: {
        // Add these lines to prevent the node externals from being bundled
        __dirname: false,
        __filename: false,
    }
}