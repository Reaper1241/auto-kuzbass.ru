// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: true,
  nitro: {
    publicAssets: [
      {
        baseURL: '/',
        dir: "runtime_public"
      }
    ]
  },
  image: {
    domains: ['api9.acduhovskoi.store/', 'car-images.ru'],
    formats: ['webp'],
  },

  plugins: [
    '~/plugins/directives.js'
  ],

  css: [
    '@fancyapps/ui/dist/fancybox/fancybox.css',
    '~/assets/style.scss',
    '@fortawesome/fontawesome-svg-core/styles.css',
    '~/assets/fontawesome/css/fontawesome.css',
    '~/assets/fontawesome/css/solid.css',
    '~/assets/fontawesome/css/brands.css',
    '~/assets/fontawesome/css/regular.css',
  ],

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'og:type', content: 'website' },
        { name: 'og:url', content: '/' },
        { name: 'og:image', content: '/og.png' },
        { name: 'og:logo', content: '/og-logo.svg' },
        { name: 'og:locale', content: 'ru_RU' },
        { name: 'yandex-verification', content: 'e16c84adddfbd3ca'},
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },

      ],
      htmlAttrs: {
        lang: 'ru'
      },

      noscript: [
        { children: `<div><img src="https://mc.yandex.ru/watch/103150430" style="position:absolute; left:-9999px;" alt="" /></div>` },
        {
          children: `<img src="https://project-f9fe0809-40a2-4385-8709-4a574a53b51c.bigmethods.ru/track.gif" alt="" width="1" height="1" style="display:none;">`,
        },
      ],

      script: [
        {
          innerHTML: `window.dataLayer = window.dataLayer || [];`,
          type: 'text/javascript',
        },
      ]
    },
    rootId: '__autokuzbass',
  },

  modules: [
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "vue3-carousel-nuxt",
    "@vueuse/nuxt",
    "@nuxt/image",
    "@nuxt/eslint",
    "nuxt-anchorscroll",
    "yandex-metrika-module-nuxt3",
  ],

  eslint: {
  },

  yandexMetrika: {
    id: '103150430',
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
    ecommerce: true,
  },

  pinia: {
    storesDirs: ['./stores/**']
  },
})