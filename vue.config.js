module.exports = {
  publicPath:'./',
  configureWebpack: {
    plugins: [
    ]
  },
  parallel: require('os').cpus().length > 1,
}