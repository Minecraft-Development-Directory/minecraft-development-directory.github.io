export function useHeader() {
  const route = useRoute();

  const desktopLinks = computed(() => [
    {
      label: "Guides",
      to: "/guides",
      active: route.path.startsWith("/guides"),
    },
    {
      label: "Blog",
      to: "/blog",
      active: route.path.startsWith("/blog"),
    },
  ]);

  const mobileLinks = computed(() => []);

  return { desktopLinks, mobileLinks };
}
