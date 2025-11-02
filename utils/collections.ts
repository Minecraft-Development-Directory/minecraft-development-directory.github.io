export function makeCollectionName(routePath: string, locale: string) {
  if (
    routePath.startsWith(`/${locale}/blog`)
    || routePath.startsWith(`/blog`)
  ) {
    return "blog"
  }
  return `docs_${locale}`
}
