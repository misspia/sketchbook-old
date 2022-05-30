// const path = require('path')
// const { ModuleFederationPlugin } = require('webpack').container
// const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// module.exports = {
//   entry: path.resolve(__dirname, './src/index.js'),
//   output: {
//     path: path.resolve(__dirname, './dist'),
//     filename: '[name].bundle.js',
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
// 				exclude: /node_modules/,
//         use: ['babel-loader'],
//       }
//     ]
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       title: 'Sketchbook',
//       template: path.resolve(__dirname, './src/template.html'),
//       filename: 'index.html',
//     }),
//     new CleanWebpackPlugin(),
//     new ModuleFederationPlugin({
//       name: 'app',
//       remotes: {
//         // S000: 'S000@[S000Url]/remoteEntry.js'
//         S000: 'S000@http://localhost:3000/remoteEntry.js'
//       }
//     }),
//     new ExternalTemplateRemotesPlugin(),
//   ],

// }


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
      }
    ]
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
        S000: 'S000@http://localhost:3001/remoteEntry.js'
      },
      shared: {
        react: { singleton: true, requiredVersion: deps.react },
        'react-dom': { singleton: true, requiredVersion: deps['react-dom'] }
      },
    }),
  ],

}
