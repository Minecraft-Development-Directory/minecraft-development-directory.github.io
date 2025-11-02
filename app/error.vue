<script setup lang="ts">
import type { NuxtError } from "#app"
import type { PageCollections } from "@nuxt/content"
import * as nuxtUiLocales from "@nuxt/ui/locale"
import { makeCollectionName } from "~~/utils/collections"

const props = defineProps<{
  error: NuxtError
}>()

const { locale, locales, t, switchLocalePath } = useMddI18n()

const lang = computed(
  () => nuxtUiLocales[locale.value as keyof typeof nuxtUiLocales]?.code || "en",
)
const dir = computed(
  () => nuxtUiLocales[locale.value as keyof typeof nuxtUiLocales]?.dir || "ltr",
)
useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [
    // { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' }
  ],
  htmlAttrs: {
    lang,
    dir,
  },
})

const localizedError = computed(() => {
  return {
    ...props.error,
    statusMessage: t("common.error.title"),
  }
})

useSeoMeta({
  title: () => t("common.error.title"),
  description: () => t("common.error.description"),
})

const route = useRoute()
const defaultLocale = useRuntimeConfig().public.i18n.defaultLocale!
onMounted(() => {
  const currentLocale = route.path.split("/")[1]
  if (!locales.some(locale => locale.code === currentLocale)) {
    return navigateTo(switchLocalePath(defaultLocale) as string)
  }
})

const collectionName = computed(() =>
  makeCollectionName(route.path, locale.value),
)

const { data: navigation } = await useAsyncData(
  `navigation_${collectionName.value}`,
  () =>
    queryCollectionNavigation(collectionName.value as keyof PageCollections),
  {
    transform: (data) => {
      const rootResult
        = data.find(item => item.path === "/guides")?.children || data || []

      return (
        rootResult.find(item => item.path === `/${locale.value}`)?.children
        || rootResult
      )
    },
    watch: [locale],
  },
)
const { data: files } = useLazyAsyncData(
  `search_${collectionName.value}`,
  () =>
    queryCollectionSearchSections(
      collectionName.value as keyof PageCollections,
    ),
  {
    server: false,
  },
)

const { rootNavigation } = useNavigation(navigation)

provide("navigation", rootNavigation)
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator
      color="var(--ui-primary)"
      :height="2"
    />

    <div
      class="min-h-screen flex flex-col"
      :class="[route.path.startsWith('/guides/') && 'root']"
    >
      <AppBanner />

      <Header />

      <NuxtLayout class="justify-center flex-1 flex flex-col">
        <UError
          :error="localizedError"
          :ui="{ statusCode: 'sm:text-4xl font-bold' }"
        />
      </NuxtLayout>

      <AppFooter />

      <ClientOnly>
        <Search
          :files="files"
          :navigation="navigation"
        />
      </ClientOnly>
    </div>
  </UApp>
</template>
