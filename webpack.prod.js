const { merge } = require('webpack-merge');
const common = require('./webpack.config');

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
    ]
})
