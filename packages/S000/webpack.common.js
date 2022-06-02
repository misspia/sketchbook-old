// const path = require('path');
// const { ModuleFederationPlugin } = require('webpack').container
// const ExternalTemplateRemotesPlugin = require("external-remotes-plugin")

// const paths = {
// 	DIST: path.resolve(__dirname, 'dist'),
// 	SRC: path.resolve(__dirname, 'src'),
// };

// module.exports = {
// 	context: path.resolve(__dirname, 'src'),
// 	entry: path.join(paths.SRC, 'index.js'),
// 	devServer: {
//     static: path.join(__dirname, 'dist'),
//     port: 3000,
//   },
// 	output: {
// 		// publicPath: 'http://localhost:3000'
// 		publicPath: 'auto'
// 	},
// 	// output: {
// 	// 	path: paths.DIST,
// 	// 	filename: 'bundle.js',
// 	// 	// publicPath: 'dist/'
// 	// },
// 	plugins: [
//     new ModuleFederationPlugin({
//       name: 'S000',
//       filename: 'remoteEntry.js',
//       exposes: {
//         './Page': './src/index.js'
//       },
//       shared: {
//         react: { singleton: true },
//         'react-dom': { singleton: true }
//       },
// 			// remotes: {
// 			// 	'SketchbookKit': 'SketchbookKit@[SketchbookKitUrl]/remoteEntry.js'
// 			// }
//     }),
// 		new ExternalTemplateRemotesPlugin(),
// 	],
// 	module: {
// 		rules: [
// 			{
// 				test: /\.(pdf|png|jpg|jpeg|gif|ico|mp3|json)$/,
// 				type: 'javascript/auto',
// 				use: [
// 					{
// 						loader: 'file-loader',
// 						options: {},
// 					}
// 				],
// 			},
// 			{
//         test: /\.(glsl|vert|frag)$/,
// 				use: [
// 					{
// 						loader: 'raw-loader',
// 						options: {},
// 					},
// 					{
// 						loader: 'glslify-loader',
// 						options: {},
// 					},
// 				],
//       },
// 			{
// 				test: /\.(js|jsx)$/,
// 				exclude: /node_modules/,
// 				use: {
// 					loader: 'babel-loader',
// 					options: {
// 						presets: ['@babel/preset-env'],
// 					}
// 				}
// 			},
// 		],
// 	},
// 	resolve: {
// 		extensions: ['.js', '.jsx'],
// 	},
// }

const deps = require('./package.json').dependencies
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container
const HtmlWebpackPlugin = require('html-webpack-plugin')

const paths = {
	DIST: path.resolve(__dirname, 'dist'),
	SRC: path.resolve(__dirname, 'src'),
};

module.exports = {
	entry:  './index.js',
	output: {
		publicPath: 'http://localhost:3001/',
		clean: true,
	},
	plugins: [
    new HtmlWebpackPlugin({
      title: 'S000',
      template: './src/template.html',
      filename: 'index.html',
    }),
		new ModuleFederationPlugin({
      name: 'S000',
      filename: 'remoteEntry.js',
			library: { type: 'var', name: 'S000' },
      exposes: {
        './Page': './src/Page.js',
      },
			remotes: {
        SketchbookKit: 'SketchbookKit@http://localhost:3001/remoteEntry.js'
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
