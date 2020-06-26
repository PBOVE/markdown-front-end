module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'TBS.feel',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    link: [ { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' } ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#2d8cf0', height: '3px', failedColor: '#ed4014' },
  /*
  ** Global CSS
  */
  css: [ 'view-design/dist/styles/iview.css', 'assets/css/main.css' ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [ 'plugins/viewUI', 'plugins/api', { src: 'plugins/vue-cropper', ssr: false } ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [ '@nuxt/typescript-build' ],
  /*
  ** Nuxt.js modules
  */
  modules: [ '@nuxtjs/axios', '@nuxtjs/proxy', 'cookie-universal-nuxt' ],
  axios: {
    proxy: true, // Can be also an object with default options
    prefix: '/api',
  },

  proxy: {
    '/api': {
      target: 'https://lovepan.top',
    },
  },
  /**
   * router
   */
  router: {
    middleware: 'auth',
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    vendor: [ 'axios', 'vue-cropper' ], //为防止重复打包
  },
};
