export function useSearch() {
  const route = useRoute();
  const { t } = useI18n();

  const links = computed(() => [
    {
      label: t("search.get-started.title"),
      description: t("search.get-started.description"),
      icon: "i-lucide-square-play",
      to: "/guides/getting-started",
      active: route.path.startsWith("/guides/getting-started"),
    },
    {
      label: t("blog.title"),
      description: t("blog.description"),
      icon: "i-lucide-newspaper",
      to: "/blog",
      active: route.path.startsWith("/blog"),
    },
    {
      label: "GitHub",
      description: t("search.github.description"),
      icon: "i-simple-icons-github",
      to: "https://github.com/Minecraft-Development-Directory/minecraft-development-directory.github.io",
      target: "_blank",
    },
  ]);

  return {
    links,
  };
}
