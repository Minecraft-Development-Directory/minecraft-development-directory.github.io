export function useHeader() {
  const route = useRoute()
  const { localePath, t } = useMddI18n()

  const desktopLinks = computed(() => [
    {
      label: t("guides.header"),
      to: localePath({ name: "guides-slug", slug: "" }),
      active: route.path.startsWith(localePath({ name: "guides-slug", slug: "" })),
    },
    {
      label: t("blog.header"),
      to: localePath("blog"),
      active: route.path.startsWith(localePath("blog")),
    },
  ])

  const mobileLinks = computed(() => [
    {
      label: t("guides.header"),
      to: localePath({ name: "guides-slug", slug: "" }),
      active: route.path.startsWith(localePath({ name: "guides-slug", slug: "" })),
    },
    {
      label: t("blog.header"),
      to: localePath("blog"),
      active: route.path.startsWith(localePath("blog")),
    },
  ])

  return { desktopLinks, mobileLinks }
}
