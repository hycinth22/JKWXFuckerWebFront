const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const os = require('os');

module.exports = {
  publicPath:'./',
  configureWebpack: {
    plugins: [
		new UglifyJsPlugin({
			test: /\.js(\?.*)?$/i,
			parallel: os.cpus().length > 1,
			cache: true
		}),
    ]
  },
  parallel: os.cpus().length > 1,
}