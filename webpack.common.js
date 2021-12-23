const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require("vue-loader");
const Dotenv = require('dotenv-webpack');
// ページ設定
const config = {
	// JavaScriptエンドポイント
	entries: {
		index: './src/assets/js/index.js', // TOPページ
		about: './src/assets/js/about.js', // aboutページ
	},
	// htmlファイル生成
	htmlWebpackPlugins(htmlMinifyConfig = {}) {
		return [
			new HtmlWebpackPlugin({
				filename: `index.html`,
				template: path.resolve(__dirname, `./src/views/index.html`),
				inject: 'body',
				chunks: ['index'],
				minify: htmlMinifyConfig
			}), // TOPページ
			new HtmlWebpackPlugin({
				filename: `about.html`,
				template: path.resolve(__dirname, `./src/views/about.html`),
				inject: 'body',
				chunks: ['about'],
				minify: htmlMinifyConfig
			}) // aboutページ
		]
	}
};

module.exports = ({ outputName, assetName, htmlMinifyConfig }) => ({
	// エントリーポイント
	entry: config.entries,

	// ファイル出力設定
	output: {
		//  出力ディレクトリ名
		path: path.resolve(__dirname, 'public'),
		// 出力ファイル名
		filename: `js/${outputName}.js`,
		chunkFilename: `js/${outputName}.js`,
		assetModuleFilename: `images/${assetName}.[ext]`, // 画像ファイルの出力先
		clean: true, // build時に出力フォルダの事前クリーンアップ
	},
	module: {
		rules: [
			{
				// babel
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				// sass
				test: /\.(scss|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					{
						loader: 'sass-loader',
						options: {
							sassOptions: {}
						},
					},
				]
			},
			// vueの単一コンポーネント関連
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						sass: [
							{ loader: 'vue-style-loader' },
							{ loader: 'css-loader' },
							{ loader: 'postcss-loader' },
							{
								loader: 'sass-loader',
								options: {
									// sassOptions: {}
								},
							},
						],
					},
				}
			},
			{
				// html
				test: /\.html$/,
				use: ['html-loader']
			},
			{
				// image,font
				test: /\.(jpe?g|gif|png|svg|woff2?|ttf|eot)$/,
				type: 'asset/resource', // webpack5からAsset Modulesが使えるためfile-loaderがいらなくなった
			},
		]
	},
	plugins: [
		// cssファイル生成
		new MiniCssExtractPlugin({
			filename: `css/${outputName}.css`
		}),
		// Vueを読み込めるようにするため
		new VueLoaderPlugin(),
		new Dotenv({
			path: `./.env.${process.env.NODE_ENV}`,
		}),
	].concat(config.htmlWebpackPlugins(htmlMinifyConfig)),
	resolve: {
		alias: {
			'@js': path.resolve(__dirname, 'src/assets/js'),
			'@scss': path.resolve(__dirname, 'src/assets/scss'),
			'@img': path.resolve(__dirname, 'src/assets/images'),
			'vue$': 'vue/dist/vue.esm.js',
		},
		extensions: ['.js', '.scss', '.vue'],
		modules: [path.resolve(__dirname, 'src'), 'node_modules'],
	},
	performance: {
		hints: false
	},

});
