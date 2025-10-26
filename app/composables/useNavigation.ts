import type { ContentNavigationItem } from "@nuxt/content";
import { findPageBreadcrumb, findPageChildren } from "@nuxt/content/utils";
import { mapContentNavigation } from "@nuxt/ui/utils/content";

function groupChildrenByCategory(
  items: ContentNavigationItem[],
  slug: string
): ContentNavigationItem[] {
  if (!items.length) {
    return [];
  }

  const groups: ContentNavigationItem[] = [];

  const categorized: Record<string, ContentNavigationItem[]> = {};
  const uncategorized: ContentNavigationItem[] = [];

  // Remove icons while grouping
  for (const item of items) {
    if (item.category) {
      categorized[item.category as string] =
        categorized[item.category as string] || [];
      categorized[item.category as string]?.push(item);
    } else {
      uncategorized.push(item);
    }
  }

  if (uncategorized.length) {
    const withChildren = uncategorized
      .filter((item) => item.children?.length)
      ?.map((item) => ({
        ...item,
        children: item.children?.map((child) => ({
          ...child,
          icon: undefined,
        })),
      }));
    const withoutChildren = uncategorized.filter(
      (item) => !item.children?.length
    );

    if (withoutChildren.length) {
      groups.push({
        title: "Overview",
        path: `/guides/${slug}`,
        children: withoutChildren?.map((item) => ({
          ...item,
          path: item.path,
          icon: undefined,
        })),
      });
    }

    groups.push(...withChildren);
  }

  /*for (const category of categories[slug as keyof typeof categories] || []) {
    if (categorized[category.id]?.length) {
      groups.push({
        title: category.title,
        path: `/docs/${slug}`,
        class: 'framework' in category ? [`${category.framework}-only`] : undefined,
        children: categorized[category.id]
      })
    }
  }*/

  return groups;
}

function processNavigationItem(
  item: ContentNavigationItem,
  parent?: ContentNavigationItem
): ContentNavigationItem | ContentNavigationItem[] {
  if (item.shadow) {
    return (
      item.children?.flatMap((child) => processNavigationItem(child, item)) ||
      []
    );
  }

  const localePath = useLocalePath();
  return {
    ...item,
    path: localePath(item.path),
    title: parent?.title ? parent.title : item.title,
    badge: parent?.badge || item.badge,
    class: [item.framework && `${item.framework}-only`].filter(Boolean),
    children: item.children?.length
      ? item.children?.flatMap((child) => processNavigationItem(child))
      : undefined,
  };
}

export const useNavigation = (
  navigation: Ref<ContentNavigationItem[] | undefined>
) => {
  const { localePath } = useMddI18n();

  const rootNavigation = computed(
    () =>
      navigation.value?.[0]?.children?.map((item) =>
        processNavigationItem(item)
      ) as ContentNavigationItem[]
  );

  const navigationByCategory = computed(() => {
    const route = useRoute();

    const slug = route.params.slug?.[0] as string;
    const children = findPageChildren(
      navigation?.value,
      localePath(`/guides/${slug}`),
      {
        indexAsChild: true,
      }
    );

    return groupChildrenByCategory(children, slug);
  });

  function findBreadcrumb(path: string) {
    const breadcrumb = findPageBreadcrumb(navigation?.value, path, {
      indexAsChild: true,
    });

    return mapContentNavigation(breadcrumb).map(({ icon, ...link }) => link);
  }

  return {
    rootNavigation,
    navigationByCategory,
    findBreadcrumb,
  };
};
