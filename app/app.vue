<script setup lang="ts">
import { withoutTrailingSlash } from "ufo";

const route = useRoute();
const { locale } = useMddI18n();

useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [
    // { rel: 'icon', href: '/favicon.ico' },
    {
      rel: "canonical",
      href: `https://minecraft-development-directory.github.io${withoutTrailingSlash(route.path)}`,
    },
  ],
});

useSeoMeta({
  ogSiteName: "Minecraft Development Directory",
  twitterCard: "summary_large_image",
});

const { data: navigation } = await useAsyncData(
  `navigation_${locale.value}`,
  () =>
    Promise.all([
      queryCollectionNavigation(`docs_${locale.value}`, ["description"]),
      queryCollectionNavigation("blog", ["description"]),
    ]),
  {
    server: true,
    transform: (data) => {
      const flatData = data.flat();

      return (
        flatData.find((item) => item.path === `/${locale.value}`)?.children ||
        flatData
      );
    },
    watch: [locale],
  }
);
const { data: files } = useLazyAsyncData(
  `search_${locale.value}`,
  () =>
    Promise.all([
      queryCollectionSearchSections(`docs_${locale.value}`),
      queryCollectionSearchSections("blog"),
    ]),
  {
    server: false,
    transform: (data) => data.flat(),
    watch: [locale],
  }
);

provide("navigation", navigation);
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator :height="2" />

    <div
      class="min-h-screen flex flex-col"
      :class="[route.path.startsWith('/docs/') && 'root']"
    >
      <AppBanner />

      <Header />

      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>

      <AppFooter />

      <ClientOnly>
        <Search :files="files" :navigation="navigation" />
      </ClientOnly>
    </div>
  </UApp>
</template>
