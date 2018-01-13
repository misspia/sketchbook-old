const path = require('path');

const paths = {
	DIST: path.resolve(__dirname, 'dist'),
	SRC: path.resolve(__dirname, 'src'),
};

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: path.join(paths.SRC, 'index.js'),
	output: {
		path: paths.DIST,
		filename: 'bundle.js',
		publicPath: 'dist/'
	},
	plugins: [
	],
	module: {
		rules: [
			{
				test: /\.(png|jpg|jpeg|gif|ico)$/,
				use: [
					'file-loader',
				],
			},
      {
        test: /\.(glsl|vert|frag)$/,
        loader: 'webpack-glsl-loader'
      },
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [
					'babel-loader',
				],
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
}
