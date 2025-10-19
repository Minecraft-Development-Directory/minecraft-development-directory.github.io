import { createResolver } from "@nuxt/kit";
import pkg from "./package.json";

const { resolve } = createResolver(import.meta.url);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/ui",
    "@nuxtjs/i18n",
    "@vueuse/nuxt",
    "motion-v/nuxt",
  ],
  $development: {
    site: {
      url: "http://localhost:3000",
    },
  },
  $production: {
    site: {
      url: "https://minecraft-development-directory.github.io/",
    },
  },

  devtools: {
    enabled: true,
  },

  app: {
    rootAttrs: {
      class: "bg-default",
    },
  },

  css: ["~/assets/css/main.css"],

  content: {
    build: {
      markdown: {
        highlight: {
          langs: [
            "bash",
            "diff",
            "json",
            "java",
            "mdc",
            "xml",
            "yaml",
            "groovy",
            "kotlin",
            "shell",
          ],
        },
      },
    },
  },

  mdc: {
    highlight: {
      noApiRoute: false,
    },
  },

  runtimeConfig: {
    public: {
      version: pkg.version,
    },
  },

  experimental: {
    defaults: {
      nuxtLink: {
        externalRelAttribute: "noopener",
      },
    },
  },

  compatibilityDate: "2025-07-15",

  vite: {
    optimizeDeps: {
      // prevents reloading page when navigating between components
      include: [
        "tailwind-variants",
        "ufo",
        "zod",
        "motion-v",
        "json5",
        "shiki-transformer-color-highlight",
      ],
    },
  },

  icons: {
    customCollections: [
      {
        prefix: "custom",
        dir: resolve("./app/assets/icons"),
      },
    ],
    clientBundle: {
      scan: true,
      includeCustomCollections: true,
    },
    provider: "iconify",
  },

  i18n: {
    locales: [
      { code: "en", name: "English", language: "en" },
      { code: "fr", name: "Français", language: "fr" },
    ],
    strategy: "prefix_except_default",
    defaultLocale: "en",
  },
});
