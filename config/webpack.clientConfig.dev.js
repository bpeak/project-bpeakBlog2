const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode : 'development',
    entry: ['@babel/polyfill', path.join(__dirname, '../', '/src/client/index.jsx')],
    output: {
        filename: "client.js",
        path: path.join(__dirname, '../', '/public'),
    },
    plugins : [
		new webpack.DefinePlugin({
			'process.env.isBrowser': JSON.stringify(true)
        }),
        new MiniCssExtractPlugin({
            filename: "app.css",
            chunkFilename: "[id].css"
        })        
	],
	module: {
		rules: [
			{
                test: /\.jsx?$/,
                exclude : /node_modules/,
				loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: ["@babel/plugin-proposal-class-properties"]
                }
			},
			{
                test: /\.scss$/,
                use : [
                    {
                        loader : MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,             
                            modules: true,
                            localIdentName: '[name]__[local]--[hash:base64:5]'
                        }                        
                    },
                    {
                        loader: "sass-loader",
                        options : {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [{
                    loader: "style-loader"
                }, {
					loader: "css-loader", 
					options: {
                        sourceMap: true,             
                    }
                }]
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
		extensions: [".js", ".jsx"],
		alias: {
            '~shared' : path.join(__dirname, '../', '/src/shared'),
            
            '~components' : path.join(__dirname, '../', '/src/shared/components'),
            '~containers' : path.join(__dirname, '../', '/src/shared/containers'),
            '~assets' : path.join(__dirname, '../', '/src/shared/assets'),
            '~redux' : path.join(__dirname, '../', '/src/shared/redux'),
            '~routes' : path.join(__dirname, '../', '/src/shared/routes'),
            '~assets' : path.join(__dirname, '../', '/src/shared/assets'),
		}		
	},
}

