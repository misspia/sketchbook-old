const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'development',
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
			"Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
		},
		port: 3008,
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('development')
			}
		})
	],
	devtool: "source-map"
});
