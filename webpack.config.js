var webpack = require('webpack');

module.exports = {
    entry: "./index.js",
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules\/.*/, loader: '6to5-loader'}
        ]
    }
};
