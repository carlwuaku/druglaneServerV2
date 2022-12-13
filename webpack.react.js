const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {
    mode: 'development',
    entry: './src/reactRenderer.tsx',
    target: 'electron-renderer',
    devtool: 'source-map',
    devServer: {
        static: path.join(__dirname, 'dist/reactRenderer.js'),
        compress: true,
        hot: true,
        port: 9000
    },
    resolve: {
        alias: {
            ['@']: path.resolve(__dirname, 'src')
        },
        extensions: ['.tsx','.ts','.js']
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                include: /src/,
                exclude: [ path.resolve(__dirname,"src/server/")],
                use: [{ loader: 'ts-loader' }]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            }
        ]
    },
    output: {
        path: __dirname + '/dist',
        filename: 'renderer.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}