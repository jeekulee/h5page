const webpack = require('webpack'),path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
	filename: "css/[name].[contenthash].css",
	disable: process.env.NODE_ENV === "development"
});

module.exports={
	entry: {
		index:"./js/index.js"
		// contactInfo:"./js/contactInfo.js",
		// settlement:"./js/settlement.js",
		// success:"./js/success.js",
		// presonInfo: "./js/presonInfo.js",
		// vendor:['./vendor/LCalendar.js','lrz','jquery','./vendor/lightbox.min.js','./vendor/mobileBUGFix.mini.js','mobile-select']
	},
	output:{
		path: path.resolve(__dirname, "dist"),
		filename: 'js/[name].[hash:8].js',
		publicPath:'/'
	},
	module:{
		loaders:[
			{
				test: /\.scss$/,
				use: extractSass.extract({
						use: [{
								loader: "css-loader",
								options:{
									minimize: true //css压缩
								}
						}, {
								loader: "sass-loader"
						}],
						// use style-loader in development 
						fallback: "style-loader"
				})
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
				  presets: ['es2015'],
				  plugins: ["transform-class-properties"]
				}
			},
			{ test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'},
			{
				test: require.resolve('jquery'),
				loader: 'exports-loader?window.$!script-loader'	
			}
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({minimize: true, compress: {warnings: true}}),
		extractSass,
		// new webpack.optimize.CommonsChunkPlugin({
        //     names: ['vendor'],
        // }),
		new CleanWebpackPlugin(
			[
				'dist/js/*.js',
				// 'dist/js/vendor.*.js',
				'dist/*.html',
				'dist/css/*.css',
			],　 //匹配删除的文件
            {
                root: __dirname,       　　　　　　　　　　//根目录
                verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
                dry:      false        　　　　　　　　　　//启用删除文件
            }
		),
		new htmlWebpackPlugin({
			filename:'index.html',
			template:'index.html',
			minify: { //压缩HTML文件
				removeComments: true, //移除HTML中的注释
				collapseWhitespace: false //删除空白符与换行符
			},
			chunks:['index']
		})
		// new htmlWebpackPlugin({
		// 	filename:'contactInfo.html',
		// 	template:'contactInfo.html',
		// 	minify: { //压缩HTML文件
		// 		removeComments: true, //移除HTML中的注释
		// 		collapseWhitespace: false //删除空白符与换行符
		// 	},
		// 	chunks:['vendor','contactInfo']
		// }),
		// new htmlWebpackPlugin({
		// 	filename:'settlement.html',
		// 	template:'settlement.html',
		// 	minify: { //压缩HTML文件
		// 		removeComments: true, //移除HTML中的注释
		// 		collapseWhitespace: false //删除空白符与换行符
		// 	},
		// 	chunks:['vendor','settlement']
		// }),
		// new htmlWebpackPlugin({
		// 	filename:'success.html',
		// 	template:'success.html',
		// 	minify: { //压缩HTML文件
		// 		removeComments: true, //移除HTML中的注释
		// 		collapseWhitespace: false //删除空白符与换行符
		// 	},
		// 	chunks:['vendor','success']
		// }),
		// new htmlWebpackPlugin({
		// 	filename: 'presonInfo.html',
		// 	template: 'presonInfo.html',
		// 	minify: { //压缩HTML文件
		// 		removeComments: true, //移除HTML中的注释
		// 		collapseWhitespace: false //删除空白符与换行符
		// 	},
		// 	chunks: ['vendor', 'presonInfo']
		// })
	],
	resolve:{
			extensions:['.js','.json'],
			alias : {
			  css : path.resolve(__dirname, "css")
			}
	}
};
