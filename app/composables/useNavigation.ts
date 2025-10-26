import type { ContentNavigationItem } from "@nuxt/content";
import { findPageBreadcrumb } from "@nuxt/content/utils";
import { mapContentNavigation } from "@nuxt/ui/utils/content";

function processNavigationItem(
  item: ContentNavigationItem,
  parent?: ContentNavigationItem
): ContentNavigationItem | ContentNavigationItem[] {
  const localePath = useLocalePath();

  if (item.shadow) {
    return (
      item.children?.flatMap((child) => processNavigationItem(child, item)) ||
      []
    );
  }

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
  const rootNavigation = computed(
    () =>
      navigation.value?.[0]?.children?.map((item) =>
        processNavigationItem(item)
      ) as ContentNavigationItem[]
  );

  function findBreadcrumb(path: string) {
    const breadcrumb = findPageBreadcrumb(navigation?.value, path, {
      indexAsChild: true,
    });

    return mapContentNavigation(breadcrumb).map(({ icon, ...link }) => link);
  }

  return {
    rootNavigation,
    findBreadcrumb,
  };
};
