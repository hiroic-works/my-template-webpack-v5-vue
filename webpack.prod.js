const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const common = require('./webpack.common.js');

const outputName = '[name]-[chunkhash]';
const assetName = '[name]-[contenthash]';
const htmlMinifyOption = {
	collapseWhitespace: true,
	removeComments: true,
	removeRedundantAttributes: true,
	removeScriptTypeAttributes: true,
	removeStyleLinkTypeAttributes: true,
	useShortDoctype: true
};

module.exports = merge(common({ outputName, assetName, htmlMinifyOption }), {
	mode: 'production',
	optimization: {
		// minify
		minimizer: [
			// js
			new TerserPlugin({
				terserOptions: {
					compress: {
						drop_console: true,	// conosole.log削除
					},
				},
			}),
			// css
			new CssMinimizerPlugin()
		],
	},
	target: ['web', 'es5']
});
