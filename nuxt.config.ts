import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/test-utils/module',
    '@nuxtjs/stylelint-module',
    '@vueuse/nuxt',
  ],
  devtools: { enabled: true },
  runtimeConfig: {
    tmdbApiKey: process.env.TMDB_API_KEY,
    public: {
      tmdbBaseUrl: 'https://api.themoviedb.org/3',
      tinyMceApiKey: process.env.TINY_MCE_API_KEY,
    },
  },
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2024-11-01',
  vite: {
    plugins: [
      tailwindcss(),
    ],
    server: {
      watch: {
        ignored: ['**/.stylelintcache'],
      },
    },
  },
  typescript: {
    typeCheck: true,
  },
});
