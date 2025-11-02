<script lang="ts" setup>
import type { ContentNavigationItem } from "@nuxt/content";
import { kebabCase } from "scule";
import { extractSlug } from "~~/utils/extractSlug";

const route = useRoute();
const { locale } = useMddI18n();

const { gameVersion, modLoader } = useGameConfig();
const navigation = inject<Ref<ContentNavigationItem[]>>("navigation");

definePageMeta({
  layout: "guides",
});

const slug = computed(() => extractSlug(route.params.slug));

if (!slug.value) {
  // If there is no slug, at all, try to redirect the page
  const redirectUrl = navigation?.value[0]?.children?.[0]?.path;
  if (typeof redirectUrl === "string") {
    throw await navigateTo(redirectUrl);
  }
}

const { data: page } = await useAsyncData(
  `guides-${slug.value}`,
  async () => {
    // Build collection name based on current locale
    const collection =
      `guides_${locale.value}` as `guides_${typeof locale.value}`;

    const content = await queryCollection(collection)
      .path(`/guides${slug.value}`)
      .first();

    // Fallback to default locale if not found
    if (!content && locale.value !== "en") {
      return await queryCollection("guides_en")
        .path(`/guides${slug.value}`)
        .first();
    }

    return content;
  },
  { watch: [locale] }
);
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

// Update the game config if the page has different one
watch(
  page,
  () => {
    if (
      page.value?.gameVersion &&
      page.value?.gameVersion !== gameVersion.value
    ) {
      gameVersion.value = page.value?.gameVersion;
    }
    if (page.value?.modLoader && page.value?.modLoader !== modLoader.value) {
      modLoader.value = page.value?.modLoader;
    }
  },
  { immediate: true }
);

const { findBreadcrumb, findSurround } = useNavigation(navigation!);

const breadcrumb = computed(() => findBreadcrumb(page.value?.path as string));
const surround = computed(() => findSurround(page.value?.path as string));

const title = page.value.seo.title
  ? page.value.seo.title
  : page.value.navigation.title
    ? page.value.navigation.title
    : page.value.title;
const description = page.value.seo.description
  ? page.value.seo.description
  : page.value.description;

useSeoMeta({
  title,
  description,
  titleTemplate: "%s - Minecraft Development Directory",
  ogTitle: title,
  ogDescription: description,
});
</script>

<template>
  <UPage v-if="page">
    <UPageHeader :title="page.title">
      <template #headline>
        <UBreadcrumb :items="breadcrumb" />
      </template>

      <template #description>
        <MDC
          v-if="page.description"
          :value="page.description"
          unwrap="p"
          :cache-key="`${kebabCase(route.path)}-description`"
        />
      </template>
    </UPageHeader>

    <UPageBody>
      <ContentRenderer v-if="page.body" :value="page" />

      <!-- Surrounds -->
      <USeparator v-if="surround" />
      <UContentSurround :surround="surround" />
    </UPageBody>

    <template v-if="page.body.toc?.links.length" #right>
      <UContentToc :links="page.body.toc.links" class="z-2">
        <template #bottom>
          <GuidesAsideRightBottom :page="page" />
        </template>
      </UContentToc>
    </template>
  </UPage>
</template>

<style></style>
