const deps = require('./package.json').dependencies
const path = require('path')
const { ModuleFederationPlugin } = require('webpack').container
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    publicPath: 'auto'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
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
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Sketchbook',
      template: path.resolve(__dirname, './src/template.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new ModuleFederationPlugin({
      name: 'app',
      remotes: {
        S000: 'S000@http://localhost:3000/remoteEntry.js',
        S001: 'S001@http://localhost:3001/remoteEntry.js',
        S002: 'S002@http://localhost:3002/remoteEntry.js',
        S003: 'S003@http://localhost:3003/remoteEntry.js',
        S004: 'S004@http://localhost:3004/remoteEntry.js',
        S005: 'S005@http://localhost:3005/remoteEntry.js',
        S006: 'S006@http://localhost:3006/remoteEntry.js',
        S007: 'S007@http://localhost:3007/remoteEntry.js',
        S008: 'S008@http://localhost:3008/remoteEntry.js',
        S009: 'S009@http://localhost:3009/remoteEntry.js',
        S010: 'S010@http://localhost:3010/remoteEntry.js',
        S011: 'S011@http://localhost:3011/remoteEntry.js',
        S012: 'S012@http://localhost:3012/remoteEntry.js',
        S013: 'S013@http://localhost:3013/remoteEntry.js',
        S014: 'S014@http://localhost:3014/remoteEntry.js',
        S015: 'S015@http://localhost:3015/remoteEntry.js',
        S016: 'S016@http://localhost:3016/remoteEntry.js',
        S017: 'S017@http://localhost:3017/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, requiredVersion: deps.react },
        'react-dom': { singleton: true, requiredVersion: deps['react-dom'] }
      },
    }),
  ],

}
