/** @format */

let proxyNeuralytics = {
  target: 'https://api.neuralytics.ai',
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
