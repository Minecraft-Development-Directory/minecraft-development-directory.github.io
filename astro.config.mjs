// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightThemeFlexoki from "starlight-theme-flexoki";
import starlightBlog from "starlight-blog";
import starlightLinksValidator from "starlight-links-validator";
import starlightImageZoom from "starlight-image-zoom";
import starlightHeadingBadges from "starlight-heading-badges";
import starlightSidebarTopics from "starlight-sidebar-topics";
import starlightVideos from "starlight-videos";
import starlightKbd from "starlight-kbd";
import starlightScrollToTop from "starlight-scroll-to-top";
import starlightAutoDrafts from "starlight-auto-drafts";
import Icons from "unplugin-icons/vite";
import { dev } from "astro";

// https://astro.build/config
export default defineConfig({
  site: "https://minecraft-development-directory.github.io",
  integrations: [
    starlight({
      title: "Minecraft Development Directories",
      description: "A comprehensive directory for Minecraft development resources.",
      defaultLocale: "en",
      pagination: true,
      editLink: {},
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/Minecraft-Development-Directory",
        },
      ],
      plugins: [
        starlightThemeFlexoki({ accentColor: "green" }),
        starlightBlog(),
        starlightLinksValidator(),
        starlightImageZoom(),
        starlightHeadingBadges(),
        starlightSidebarTopics(
          [
            {
              id: "getting-started",
              icon: "rocket",
              label: "Getting Started",
              link: "/getting-started/",
              items: [],
            },
            {
              id: "development",
              icon: "laptop",
              label: "Development",
              link: "/development/",
              items: [
                'development',
                { label: "Mods", autogenerate: { directory: "development/mods" }, collapsed: true },
                { label: "Plugins", autogenerate: { directory: "development/plugins" }, collapsed: true },
                { label: "Launcher", autogenerate: { directory: "development/launcher" }, collapsed: true },
                { label: "Tools", autogenerate: { directory: "development/tools" }, collapsed: true },
              ],
            },
            {
              id: "blog",
              icon: "comment",
              label: "Blog",
              link: "/blog",
              items: [],
            },
          ],
          {
            topics: {
              gettingStarted: ["/getting-started/", "/getting-started/**/*"],
              development: ["/development/", "/development/**/*"],
              blog: ["/blog/", "/blog/**/*"],
            },
          },
        ),
        starlightVideos(),
        starlightKbd({
          types: [
            { id: "mac", label: "macOS" },
            { id: "windows", label: "Windows", default: true },
            { id: "linux", label: "Linux" },
          ],
        }),
      ],
    }),
    starlightScrollToTop(),
    starlightAutoDrafts(),
  ],
  vite: {
    plugins: [Icons({ compiler: "astro" })],
  },
});
