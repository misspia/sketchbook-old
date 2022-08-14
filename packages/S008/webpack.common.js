const deps = require('./package.json').dependencies
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container
const HtmlWebpackPlugin = require('html-webpack-plugin')

const APP_NAME = "S008"

module.exports = {
	entry:  './index.js',
	output: {
		publicPath: 'http://localhost:3008/',
		clean: true,
	},
	plugins: [
    new HtmlWebpackPlugin({
      title: APP_NAME,
      template: './src/template.html',
      filename: 'index.html',
    }),
		new ModuleFederationPlugin({
      name: APP_NAME,
      filename: 'remoteEntry.js',
			library: { type: 'var', name: APP_NAME },
      exposes: {
        './Page': './src/Page.jsx',
      },
      shared: {
        react: { singleton: true, requiredVersion: deps.react },
				'react-dom': { singleton: true, requiredVersion: deps['react-dom'] }
      },
    }),
	],
	module: {
		rules: [
			{
				test: /\.(pdf|png|jpg|jpeg|gif|ico|mp3|json)$/,
				type: 'javascript/auto',
				use: [
					{
						loader: 'file-loader',
						options: {},
					}
				],
			},
			{
        test: /\.(glsl|vert|frag)$/,
				use: [
					{
						loader: 'raw-loader',
						options: {},
					},
					{
						loader: 'glslify-loader',
						options: {},
					},
				],
      },
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					}
				}
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
}
