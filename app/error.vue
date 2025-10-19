<script setup lang="ts">
import type { NuxtError } from "#app";
import type { PageCollections } from "@nuxt/content";
import * as nuxtUiLocales from "@nuxt/ui/locale";

const props = defineProps<{
  error: NuxtError;
}>();

const { locale, locales, t, switchLocalePath } = useMddI18n();

const lang = computed(
  () => nuxtUiLocales[locale.value as keyof typeof nuxtUiLocales]?.code || "en"
);
const dir = computed(
  () => nuxtUiLocales[locale.value as keyof typeof nuxtUiLocales]?.dir || "ltr"
);
useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [
    // { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' }
  ],
  htmlAttrs: {
    lang,
    dir,
  },
});

const localizedError = computed(() => {
  return {
    ...props.error,
    statusMessage: t("common.error.title"),
  };
});

useSeoMeta({
  title: () => t("common.error.title"),
  description: () => t("common.error.description"),
});

const route = useRoute();
const defaultLocale = useRuntimeConfig().public.i18n.defaultLocale!;
onMounted(() => {
  const currentLocale = route.path.split("/")[1];
  if (!locales.some((locale) => locale.code === currentLocale)) {
    return navigateTo(switchLocalePath(defaultLocale) as string);
  }
});

const collectionName = computed(() => `docs_${locale.value}`);

const { data: navigation } = await useAsyncData(
  `navigation_${collectionName.value}`,
  () =>
    queryCollectionNavigation(collectionName.value as keyof PageCollections),
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
    <NuxtLoadingIndicator color="var(--ui-primary)" :height="2" />

    <div :class="[route.path.startsWith('/docs/') && 'root']">
      <AppBanner />

      <Header />

      <NuxtLayout>
        <UError :error="localizedError" />
      </NuxtLayout>

      <AppFooter />

      <ClientOnly>
        <Search :files="files" :navigation="navigation" />
      </ClientOnly>
    </div>
  </UApp>
</template>
