const deps = require('./package.json').dependencies
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container
const HtmlWebpackPlugin = require('html-webpack-plugin')

const APP_NAME = 'toolkit'

module.exports = {
	entry:  './index.js',
	output: {
		publicPath: 'http://localhost:8081/',
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
				'./utils': './src/utils.js',
				'./components': './src/components/index.js',
        './hooks': './src/hooks/index.js',
        './audio': './src/audio/index.js',
        './AudioManager': './src/AudioManager.js',
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
