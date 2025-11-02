export function useHeader() {
  const route = useRoute();
  const { localePath, t } = useMddI18n();

  const guidesPath = localePath({ name: "guides-slug", slug: "" });

  const desktopLinks = computed(() => [
    {
      label: t("guides.header"),
      to: guidesPath,
      active: route.path.startsWith(guidesPath),
    },
    {
      label: t("blog.header"),
      to: localePath("blog"),
      active: route.path.startsWith(localePath("blog")),
    },
  ]);

  const mobileLinks = computed(() => [
    {
      label: t("guides.header"),
      to: guidesPath,
      active: route.path.startsWith(guidesPath),
    },
    {
      label: t("blog.header"),
      to: localePath("blog"),
      active: route.path.startsWith(localePath("blog")),
    },
  ]);

  return { desktopLinks, mobileLinks };
}
