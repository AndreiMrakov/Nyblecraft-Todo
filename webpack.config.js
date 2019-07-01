const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// module.exports = {
//     entry: path.join(__dirname + '/src/index.js'),
//     output: {
//         path: path.join(__dirname + "/public/"),
//         filename: 'bundle.js'
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.jsx?$/,
//                 exclude: /(node_modules)/,
//                 loaders: ['babel-loader']
//             },
//             {
//                 test: /\.scss$/,
//                 use: [
//                     'style-loader',
//                     MiniCssExtractPlugin,
//                     {
//                         loader: "css-loader",
//                         options: {sourceMap: true}
//                     }, {
//                         loader: "sass-loader",
//                         options: {sourceMap: true}
//                     }
//                 ]
//             },
//             {
//                 test: /\.css$/,
//                 use: [
//                     MiniCssExtractPlugin,
//                     "css-loader",
//                 ]
//             },
//
//         ]
//     },
//     plugins: [
//         new MiniCssExtractPlugin({filename: '[name].css'})
//     ]
// };

module.exports = {
    entry: path.join(__dirname + '/src/index.js'),
    output: {
        path: path.join(__dirname + "/public/"),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    },
                    {
                        loader: "sass-loader" // compiles Sass to CSS
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            }
        ]
    }
};