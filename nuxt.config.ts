import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/test-utils',
    '@nuxtjs/stylelint-module',
    '@vueuse/nuxt',
  ],
  devtools: { enabled: true },
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
})
