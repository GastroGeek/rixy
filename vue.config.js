const { resolve } = require('path')

module.exports = {
  runtimeCompiler: true,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve(__dirname, 'src'))
      .set('@assets', resolve(__dirname, 'src/assets'))
      .set('@app', resolve(__dirname, 'src/App.vue'))
      .set('@components', resolve(__dirname, 'src/components'))
      .set('@plugins', resolve(__dirname, 'src/plugins'))
      .set('@router', resolve(__dirname, 'src/router'))
      .set('@store', resolve(__dirname, 'src/store'))
      .set('@utils', resolve(__dirname, 'src/utils'))
      .set('@views', resolve(__dirname, 'src/views'))
      .set('@worker', resolve(__dirname, 'src/registerServiceWorker.js'))
  },
  pwa: {
    name: 'Rixy',
    short_name: 'Rixy',
    themeColor: '#000',
    msTileColor: '#000000',
    backgroundColor: '#000',
    display: 'standalone',
    lang: 'en',
    appleMobileWebAppStatusBarStyle: 'black-translucent'
  }
}
