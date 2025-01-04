// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "@pinia/nuxt",
    "nuxt-rating",
    "@nuxt/image"
  ],
  css: ['~/assets/css/main.css'],
  experimental: {
    payloadExtraction: false
  },
  ui: {
    theme: {
      colors: ['primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'error']
    }
  },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: "2024-11-27",
  routeRules: {
    '/': { redirect: '/clubfest2025' },
    // '/clubfest2025': { prerender: true },
    '/clubfest2025/**/**/vote': { isr: true },
    '/clubfest2025/**/**/qrcode': { isr: true },
  }
})