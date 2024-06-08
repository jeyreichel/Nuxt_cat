// nuxt.config.js
export default {
  buildDir: "dist",
  target: "static",
  build: {
    // Customize the build configuration here
  },
  generate: {
    fallback: true, // If you are using dynamic routes
  },
  css: ["@/assets/css/tailwind.css"],
  buildModules: ["@nuxtjs/tailwindcss"],
  modules: ["@nuxtjs/composition-api/module"],
  plugins: ["~/plugins/meowFacts.js", "~/plugins/pinia.js"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  head: {
    link: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Jost:wght@400;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/icon?family=Material+Icons",
      },
    ],
  },
};

// export default {
//   target: 'static', // Can be 'static' or 'server'
//   buildModules: [
//     // Doc: https://go.nuxtjs.dev/typescript
//     '@nuxt/typescript-build',
//   ],
//   modules: [
//     // Doc: https://go.nuxtjs.dev/axios
//     '@nuxtjs/axios',
//   ],
//   axios: {
//     // See https://axios.nuxtjs.org/options
//   },
//   build: {
//   }
// }
