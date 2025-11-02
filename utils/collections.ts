export function makeCollectionName(routePath: string, locale: string) {
  if (
    routePath.startsWith(`/${locale}/blog`)
    || routePath.startsWith(`/blog`)
  ) {
    return "blog"
  }
  return `docs_${locale}`
}

export async function onlyIf<R>(
  condition: boolean,
  fn: () => Promise<R>,
): Promise<R | undefined> {
  if (condition) {
    return await fn()
  }
  return Promise.resolve(undefined)
}
