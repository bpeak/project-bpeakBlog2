const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
	mode: 'development',
	target : 'node',
	node: { __dirname : true },	
	externals : [nodeExternals()],
	entry: ['@babel/polyfill', path.join(__dirname, '../', '/src/server/index.js')],
	output: {
		path: path.join(__dirname, '../', '/dist'),
		filename: 'server.js',
	},
	module: {
		rules: [
			{
				include : [
					/\.css$/,
				],
				loader: 'ignore-loader',
			},
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
						plugins: ["@babel/plugin-proposal-class-properties"]
                    }
                }
			},
			{
				test: /\.scss$/,
				use : [
					{
						loader : "css-loader/locals",
						options: {
							sourceMap: true,             
							modules: true,
							localIdentName: '[name]__[local]--[hash:base64:5]'       
						}
					},
					{
						loader: 'sass-loader'
					}
				]
			},
            {
                test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            publicPath : '/public/imgs', // file-loader 사용시에 이미지가 사용할 기준경로
                            outputPath : '../public/imgs', // file-lodaer 사용시에 결과물위치 ( dist 폴더기준 )
                            name: '[name].[ext]',
                            limit: 10000,
                        }
                    }
                ]
            }					
		]
	},
	resolve : {
		extensions: ['.js', '.jsx'],
		alias: {
			'~shared' : path.join(__dirname, '../', '/src/shared'),

            '~components' : path.join(__dirname, '../', '/src/shared/components'),
            '~containers' : path.join(__dirname, '../', '/src/shared/containers'),
            '~assets' : path.join(__dirname, '../', '/src/shared/assets'),
            '~redux' : path.join(__dirname, '../', '/src/shared/redux'),
			'~routes' : path.join(__dirname, '../', '/src/shared/routes'),
			'~assets' : path.join(__dirname, '../', '/src/shared/assets'),

			'~db' : path.join(__dirname, '../', '/src/server/db'),
			'~configs' : path.join(__dirname, '../', '/src/server/configs'),
			'~modules' : path.join(__dirname, '../', '/src/server/modules'),
			'~constants' : path.join(__dirname, '../', '/src/server/constants'),
			'~middlewares' : path.join(__dirname, '../', '/src/server/middlewares'),
		}		
	},
}