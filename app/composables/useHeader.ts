export function useHeader() {
  const route = useRoute();
  const { localePath } = useMddI18n();

  const desktopLinks = computed(() => [
    {
      label: "Guides",
      to: localePath("/guides"),
      active: route.path.startsWith(localePath("/guides")),
    },
    {
      label: "Blog",
      to: localePath("/blog"),
      active: route.path.startsWith(localePath("/blog")),
    },
  ]);

  const mobileLinks = computed(() => [
    {
      label: "Guides",
      to: localePath("guides"),
      active: route.path.startsWith(localePath("/guides")),
    },
    {
      label: "Blog",
      to: localePath("blog"),
      active: route.path.startsWith(localePath("/blog")),
    },
  ]);

  return { desktopLinks, mobileLinks };
}
