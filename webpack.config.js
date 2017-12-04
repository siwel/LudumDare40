const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const phaserModule = path.join(__dirname, '/node_modules/phaser-ce/');
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
const creature = path.join(phaserModule, 'build/custom/phaser-creature.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');

const __DEV__ = process.env.NODE_ENV !== 'production';

module.exports = {
	entry: {
		app: path.resolve(__dirname, 'src/app.js'),
		vendor: ['pixi', 'p2', 'phaser']
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'build')
	},
	module: {
		rules: [
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'url-loader?limit=10000',
                    'img-loader'
                ]
            },
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-env', {
								targets: {
									browsers: ['last 2 versions']
								}
							}], ['@babel/preset-react']
						],
						//plugins: ['transform-object-rest-spread'],
						cacheDirectory: true
					}
				}, include: path.join(__dirname, 'src')
			},
			{
				test: /\.css$/,
				use: [
					{ loader: 'style-loader' },
					{
						loader: 'css-loader',
						options: {
							modules: true
						}
					}
				]
			},
			{ test: /pixi\.js/, use: ['expose-loader?PIXI'] },
			{ test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
			{ test: /p2\.js/, use: ['expose-loader?p2'] }
		]
	},
	plugins: [
		new webpack.DefinePlugin({ __DEV__: JSON.stringify(__DEV__) }),
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
        new CopyWebpackPlugin([
                {
                    from: 'assets'
                }])
	],
	resolve: {
		alias: {
			phaser,
			pixi,
			p2
		}
	},
	devServer: {
		contentBase: path.join(__dirname, 'build'),
		compress: true,
		port: 8080
	},
	devtool: __DEV__ ? 'eval' : false
};
