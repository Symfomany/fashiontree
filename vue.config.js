/** @format */

let proxyNeuralytics = {
  target: 'http://localhost:3000',
  changeOrigin: true,
};

module.exports = {
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    devtool: 'source-map',
  },
  devServer: {
    proxy: {
      '/login': proxyNeuralytics,
      '/api': proxyNeuralytics,
    },
  },
};
