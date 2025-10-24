<script setup lang="ts">
import { withoutTrailingSlash } from "ufo";
import * as nuxtUiLocales from "@nuxt/ui/locale";
import type { PageCollections } from "@nuxt/content";

const route = useRoute();
const { locale, locales, switchLocalePath } = useMddI18n();

const lang = computed(
  () => nuxtUiLocales[locale.value as keyof typeof nuxtUiLocales]?.code || "en"
);
const dir = computed(
  () => nuxtUiLocales[locale.value as keyof typeof nuxtUiLocales]?.dir || "ltr"
);
const collectionName = computed(() => `docs_${locale.value}`);

useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [
    // { rel: 'icon', href: '/favicon.ico' },
    {
      rel: "canonical",
      href: `https://minecraft-development-directory.github.io${withoutTrailingSlash(route.path)}`,
    },
  ],
  htmlAttrs: {
    lang,
    dir,
  },
});

useSeoMeta({
  ogSiteName: "Minecraft Development Directory",
  twitterCard: "summary_large_image",
});

const defaultLocale = useRuntimeConfig().public.i18n.defaultLocale;
onMounted(() => {
  const currentLocale = route.path.split("/")[1];
  if (!locales.some((locale) => locale.code === currentLocale)) {
    return navigateTo(switchLocalePath(defaultLocale) as string);
  }
});

const { data: navigation } = await useAsyncData(
  `navigation_${collectionName.value}`,
  () =>
    queryCollectionNavigation(collectionName.value as keyof PageCollections, [
      "description",
    ]),
  {
    transform: (data) => {
      const rootResult =
        data.find((item) => item.path === "/docs")?.children || data || [];

      return (
        rootResult.find((item) => item.path === `/${locale.value}`)?.children ||
        rootResult
      );
    },
    watch: [locale],
  }
);
const { data: files } = useLazyAsyncData(
  `search_${collectionName.value}`,
  () =>
    queryCollectionSearchSections(
      collectionName.value as keyof PageCollections
    ),
  {
    server: false,
  }
);

const { rootNavigation } = useNavigation(navigation);

provide("navigation", rootNavigation);
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
