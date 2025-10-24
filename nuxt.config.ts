import { createResolver } from "@nuxt/kit";
import pkg from "./package.json";

const { resolve } = createResolver(import.meta.url);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    resolve("./modules/config"),
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/ui",
    "@nuxtjs/i18n",
    "@vueuse/nuxt",
    "motion-v/nuxt",
    "nuxt-site-config",
    "nuxt-og-image",
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

  css: ["~/assets/css/main.css"],

  content: {
    watch: {
      enabled: true,
    },

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

        remarkPlugins: { "remark-reading-time": {} },
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

  icon: {
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

  ssr: true,
  nitro: {
    static: true,
    preset: "github-pages",
    prerender: {
      routes: ["/api/github/contributors.json"],
      failOnError: false,
      crawlLinks: true,
    },
  },

  i18n: {
    locales: [
      { code: "en", name: "English", language: "en" },
      { code: "fr", name: "Français", language: "fr" },
    ],
    strategy: "prefix",
    defaultLocale: "en",
  },

  watch: ["content/**/*.{yaml,md,json}"],
});
