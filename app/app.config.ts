export default defineAppConfig({
  github: {
    url: "https://github.com/Minecraft-Development-Directory/minecraft-development-directory.github.io",
    branch: "main",
    rootDir: null,
  },
  header: {
    title: "Minecraft Development Directory",
  },
  seo: {
    title: "Minecraft Development Directories",
    description:
      "A comprehensive directory for Minecraft development resources.",
  },

  ui: {
    main: {
      base: "min-h-[calc(100vh-var(--ui-header-height))]",
    },
  },

  toc: {},
})
