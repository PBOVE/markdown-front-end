module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Mountain',
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
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [ 'iview/dist/styles/iview.css', 'assets/css/main.css' ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [ '@/plugins/iview', '@/plugins/api' ],
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
    extend(config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint',
          exclude: /(node_modules)/,
        });
      }
    },
    vendor: [ 'axios' ], //为防止重复打包
  },
};
