const deps = require('./package.json').dependencies
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry:  './index.js',
	output: {
		publicPath: 'http://localhost:3005/',
		clean: true,
	},
	plugins: [
    new HtmlWebpackPlugin({
      title: 'S005',
      template: './src/template.html',
      filename: 'index.html',
    }),
		new ModuleFederationPlugin({
      name: 'S005',
      filename: 'remoteEntry.js',
			library: { type: 'var', name: 'S005' },
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
