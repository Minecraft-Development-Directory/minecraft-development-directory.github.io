import type { ContentNavigationItem } from "@nuxt/content"
import { findPageBreadcrumb, findPageChildren } from "@nuxt/content/utils"
import { mapContentNavigation } from "@nuxt/ui/utils/content"
import type { Locale } from "@intlify/core"

function groupChildrenByCategory(
  items: ContentNavigationItem[],
  slug: string,
  { t}: { t: (key: string) => string },
): ContentNavigationItem[] {
  if (!items.length) {
    return []
  }

  const groups: ContentNavigationItem[] = []

  const categorized: Record<string, ContentNavigationItem[]> = {}
  const uncategorized: ContentNavigationItem[] = []

  // Remove icons while grouping
  for (const item of items) {
    if (item.category) {
      categorized[item.category as string]
        = categorized[item.category as string] || []
      categorized[item.category as string]?.push(item)
    }
    else {
      uncategorized.push(item)
    }
  }

  if (uncategorized.length) {
    const withChildren = uncategorized
      .filter(item => item.children?.length)
      ?.map(item => ({
        ...item,
        children: item.children?.map(child => ({
          ...child,
          icon: undefined,
        })),
      }))
    const withoutChildren = uncategorized.filter(
      item => !item.children?.length,
    )

    if (withoutChildren.length) {
      groups.push({
        title: t("guides.overview"),
        path: `/guides/${slug}`,
        children: withoutChildren?.map(item => ({
          ...item,
          path: item.path,
          icon: undefined,
        })),
      })
    }

    groups.push(...withChildren)
  }

  return groups
}

interface ProcessNavigationItemOptions {
  parent?: ContentNavigationItem
  locale: Locale
}

function processNavigationItem(
  item: ContentNavigationItem,
  options: ProcessNavigationItemOptions,

): ContentNavigationItem | ContentNavigationItem[] {
  if (item.shadow) {
    return (
      item.children?.flatMap(child => processNavigationItem(child, { parent: item, locale: options.locale }))
      || []
    )
  }

  return {
    ...item,
    path: `/${options.locale}${item.path}`,
    title: options.parent?.title ? options.parent.title : item.title,
    badge: options.parent?.badge || item.badge,
    class: [item.framework && `${item.framework}-only`].filter(Boolean),
    children: item.children?.length
      ? item.children?.flatMap(child => processNavigationItem(child, { locale: options.locale }))
      : undefined,
  }
}

export const useNavigation = (
  navigation: Ref<ContentNavigationItem[] | undefined>,
) => {
  const { locale, t } = useMddI18n()
  const route = useRoute()

  const rootNavigation = computed(() => {
    return navigation.value?.[0]?.children?.map(item =>
      processNavigationItem(item, { locale: locale.value }),
    ) as ContentNavigationItem[]
  })

  const navigationByCategory = computed(() => {
    const slug = route.params.slug?.[0] as string
    const children = findPageChildren(
      navigation?.value,
      `/${locale.value}/guides/${slug}`,
      {
        indexAsChild: true,
      },
    )

    return groupChildrenByCategory(children, slug, { t })
  })

  function findSurround(
    path: string,
  ): [ContentNavigationItem | undefined, ContentNavigationItem | undefined] {
    const flattenNavigation
      = navigationByCategory.value?.flatMap(item => item?.children) ?? []

    const index = flattenNavigation.findIndex(
      item => item?.path === `/${locale.value}${path}`,
    )

    if (index === -1) {
      return [undefined, undefined]
    }

    return [flattenNavigation[index - 1], flattenNavigation[index + 1]]
  }

  function findBreadcrumb(path: string) {
    const breadcrumb = findPageBreadcrumb(navigation?.value, path, {
      indexAsChild: true,
    })

    return mapContentNavigation(breadcrumb).map(({ icon, ...link }) => link)
  }

  return {
    rootNavigation,
    navigationByCategory,
    findBreadcrumb,
    findSurround,
  }
}
