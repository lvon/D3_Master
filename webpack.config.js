var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './pintu/index.js'),
    output: {
        path: path.resolve('./dist', './'),
        filename: 'index.js',
    }
};