export function makeCollectionName(routePath: string, locale: string) {
  if (
    routePath.startsWith(`/${locale.value}/blog`) ||
    routePath.startsWith(`/blog`)
  ) {
    return "blog";
  }
  return `docs_${locale.value}`;
}
