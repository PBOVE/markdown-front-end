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
      { name: 'google-site-verification', content: 'dhTaTccD_FtgerXGfHKhOQc3voBRhrqmh9xZnkDrzuU' },
      { name: 'keywords', content: 'TBS.fell' },
      { ame: 'description', content: '记录学习中遇到困难与问题,分享学习中的心得体会' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', href: '/icon-120x120.png', sizes: '120x120' },
    ],
    script: []
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
  css: ['view-design/dist/styles/iview.css', 'assets/css/main.css'],
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
  buildModules: ['@nuxt/typescript-build'],
  /*
  ** Nuxt.js modules
  */
  modules: ['@nuxtjs/axios', '@nuxtjs/proxy', 'cookie-universal-nuxt', ['nuxt-highlightjs', {
    style: 'dracula'
  }]],

  axios: {
    proxy: true, // Can be also an object with default options
    prefix: '/api'
  },
  proxy: {
    '/api/storage': { target: 'https://tibis.top/' },
    '/api': { target: 'http://127.0.0.1:7001' }
  },
  /**
   * router
   */
  router: {
    middleware: ['auth', 'view', 'access']
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    vendor: ['axios', 'vue-cropper'] // 为防止重复打包
  },
  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}'
      }
    }
  }
};
