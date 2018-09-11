const path = require('path');

module.exports = {
    entry: {
        'index': './src/index.js',
        'app': './src/app.js',
    },
    output: {
        filename: '[name].build.js',
        path: path.resolve(__dirname, 'build')
    }, 
    module: {
        rules: [
            { 
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['babel-preset-env', 'babel-preset-react']
                }
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
        ]
    },
    mode: 'development'
}