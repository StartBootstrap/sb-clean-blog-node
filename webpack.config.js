const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    target: 'node',
    mode: 'development',
    entry: path.resolve(__dirname, 'src/index.ts'),
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    configFile: path.resolve(__dirname, 'src/tsconfig.app.json'),
                },
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@app': path.resolve(__dirname, 'src/app/'),
            '@lib': path.resolve(__dirname, 'src/lib/'),
            '@models': path.resolve(__dirname, 'src/models/'),
        }
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'sb-clean-blog-node.js'
    },
    externals: [nodeExternals({
        whitelist: ['@start-bootstrap/sb-clean-blog-shared-types'],
    })],
};
