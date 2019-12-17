/** @format */

let proxyNeuralytics = {
  target: 'http://localhost:3000',
  changeOrigin: true,
};

module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'fr',
      fallbackLocale: 'fr',
      localeDir: 'lang',
      enableInSFC: true,
    },
  },
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
