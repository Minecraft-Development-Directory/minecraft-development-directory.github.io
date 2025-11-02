import type { ContentNavigationItem } from "@nuxt/content"

interface MergeOptions {
  fallbackLocale: string
  targetLocale: string
}

type WithFallback<T> = T & {
  _isFallback?: boolean
  _fallbackFrom?: string
  _targetLocale?: string
}

export type ContentNavigationItemWithFallback = WithFallback<ContentNavigationItem>

export function mergeNav(current: ContentNavigationItem[], fallback: ContentNavigationItem[], options: MergeOptions): ContentNavigationItem[] {
  // Create a map of existing pages by their path/slug
  const currentMap = new Map(
    current.map(item => [item.path, item]),
  )

  // add fallback pages that don't exists in current locale
  const mergedNav = [...current]

  for (const fallbackItem of fallback) {
    const key = fallbackItem.path
    if (!currentMap.has(key)) {
      // Add fallback item with locale metadata
      mergedNav.push({
        ...fallbackItem,
        _isFallback: true,
        _fallbackFrom: options.fallbackLocale,
        _targetLocale: options.targetLocale,
      })
    }
  }

  return mergedNav
}

type SearchSection = Awaited<ReturnType<typeof queryCollectionSearchSections>>[number]

type SearchSectionsWithFallback = WithFallback<SearchSection>

export function mergeSearchSections(current: SearchSection[], fallback: SearchSection[], options: MergeOptions): SearchSectionsWithFallback[] {
  // Create a map of existing pages by their path/slug
  const currentMap = new Map(
    current.map(item => [item.id, item]),
  )

  // add fallback pages that don't exists in current locale
  const mergedSearch: SearchSectionsWithFallback[] = [...current]

  for (const fallbackItem of fallback) {
    const key = fallbackItem.id
    if (!currentMap.has(key)) {
      // Add fallback item with locale metadata
      mergedSearch.push({
        ...fallbackItem,
        _isFallback: true,
        _fallbackFrom: options.fallbackLocale,
        _targetLocale: options.targetLocale,
      })
    }
  }

  return mergedSearch
}
