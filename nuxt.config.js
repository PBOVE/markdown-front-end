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
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css' }
    ],
    script: [ { src: 'https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.js' } ]
  },
  /**
   * 使用watchQuery属性可以监听参数字符串的更改
   */
  watchQuery: true,
  // disable Nuxt Telemetry
  telemetry: false,
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
  plugins: [
    'plugins/viewUI',
    'plugins/api',
    'plugins/filter',
    { src: 'plugins/editor', ssr: false },
    { src: 'plugins/vue-cropper', ssr: false }
  ],
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
    prefix: '/api'
  },

  proxy: {
    '/api/storage': {
      target: 'https://tibis.top/'
    },
    '/api': {
      target: 'https://tibis.top/'
    }
  },
  /**
   * router
   */
  router: {
    middleware: [ 'auth', 'view', 'access' ]
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    vendor: [ 'axios', 'vue-cropper' ] // 为防止重复打包
  },
  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}'
      }
    }
  }
};
