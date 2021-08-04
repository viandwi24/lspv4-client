export default {
  // Enviroment Variable
  env: {
    API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:8000/api',
    API_PREFIX: process.env.API_PREFIX || 'v1'
  },

  // server
  server: {
    host: process.env.HOST || '0.0.0.0', // default: localhost,
    port: process.env.PORT || 3000
  },

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'lspv4',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/vendor.scss',
    '@/assets/scss/app.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/axios.js',
    '@/plugins/bootstrap.js',
    '@/plugins/helper.js',
    { src: '@/plugins/components.js', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module', // https://go.nuxtjs.dev/eslint
    '@nuxtjs/tailwindcss', // https://tailwindcss.com/docs/guides/nuxtjs
    '@nuxtjs/fontawesome', // https://www.npmjs.com/package/@nuxtjs/fontawesome
    '@nuxtjs/composition-api/module', // https://composition-api.nuxtjs.org/getting-started/setup
    '@nuxtjs/moment', // https://www.npmjs.com/package/@nuxtjs/moment
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios', // https://go.nuxtjs.dev/axios
    '@nuxtjs/auth-next', // https://auth.nuxtjs.org/guide/setup/
    'vue-sweetalert2/nuxt', // https://www.npmjs.com/package/vue-sweetalert2
    '@nuxtjs/toast', // https://www.npmjs.com/package/@nuxtjs/toast
    'nuxt-vue-select', // https://www.npmjs.com/package/nuxt-vue-select
  ],

  // router
  router: {
    // base: '/app/'
    middleware: ['userMustBeVerified']
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // loading
  loading: {
    color: 'black',
    height: '5px'
  },

  // fontawesome
  fontawesome: {
    icons: {
      solid: true,
      brands: true
    }
  },

  // auth
  auth: {
    redirect: {
      home: '/dashboard',
      login: '/auth/login',
      logout: '/auth/logout'
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
            propertyName: 'token'
          },
          logout: {
            url: '/auth/logout',
            method: 'post'
          },
          user: {
            url: '/auth/user',
            method: 'get'
          },
          refresh: {
            url: '/auth/refresh-token',
            method: 'post',
            propertyName: 'token'
          }
        }
      }
    }
  },

  // sweetalert
  sweetalert: {
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Iya',
    cancelButtonText: 'Batal'
  },

  // toast
  toast: {
    position: 'bottom-right',
    duration: 10000
  }
}
