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
import Icons from 'unplugin-icons/vite'

// https://astro.build/config
export default defineConfig({
  site: "https://minecraft-development-directory.github.io",
  integrations: [
    starlight({
      title: "Minecraft Development Directories",
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
        starlightSidebarTopics([
          {
            label: "Mods",
            link: "/mods",
            items: [
              {
                label: "Guides",
                items: [
                  // Each item here is one entry in the navigation menu.
                  { label: "Example Guide", slug: "guides/example" },
                ],
              },
              {
                label: "Reference",
                autogenerate: { directory: "reference" },
              },
            ],
          },
          {
            label: "Plugins",
            link: "/plugins",
            items: [],
          },
          {
            label: "Launcher",
            link: "/launcher",
            items: [],
          },
        ]),
        starlightVideos(),
        starlightKbd({
          types: [
            { id: "mac", label: "macOS" },
            { id: "windows", label: "Windows", default: true },
            { id: "linux", label: "Linux" },
          ],
        }),
      ],
      components: {
        // Override the default `Sidebar` component with a custom one.
        Sidebar: "./src/components/Sidebar.astro",
      },
    }),
    starlightScrollToTop(),
    starlightAutoDrafts(),
  ],
  vite: {
    plugins: [Icons({ compiler: 'astro'})]
  }
});
