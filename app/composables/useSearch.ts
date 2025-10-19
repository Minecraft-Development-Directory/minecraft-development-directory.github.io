export function useSearch() {
  const route = useRoute();

  const links = computed(() => [
    {
      label: "Get Started",
      description:
        "Learn how to get started on Minecraft Development Directories",
      icon: "i-lucide-square-play",
      to: "/guides/getting-started",
      active: route.path.startsWith("/guides/getting-started"),
    },
    {
      label: "GitHub",
      description:
        "Check out the Minecraft Development Directories repository and follow development on GitHub.",
      icon: "i-simple-icons-github",
      to: "https://github.com/Minecraft-Development-Directory/minecraft-development-directory.github.io",
      target: "_blank",
    },
  ]);

  return {
    links,
  };
}
