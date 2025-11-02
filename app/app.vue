<script setup lang="ts">
import { withoutTrailingSlash } from "ufo"

const route = useRoute()
const { locale } = useMddI18n()

useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [
    // { rel: 'icon', href: '/favicon.ico' },
    {
      rel: "canonical",
      href: `https://minecraft-development-directory.github.io${withoutTrailingSlash(route.path)}`,
    },
  ],
})

useSeoMeta({
  ogSiteName: "Minecraft Development Directory",
  twitterCard: "summary_large_image",
})

const { data: navigation } = await useAsyncData(
  `navigation_${locale.value}`,
  () =>
    Promise.all([
      queryCollectionNavigation(`guides_${locale.value}`, [
        "description",
        "gameVersion",
        "modLoader",
      ]),
      queryCollectionNavigation("blog", ["description"]),
    ]),
  {
    server: true,
    transform: data => data.flat(),
    watch: [locale],
  },
)

const { data: files } = useLazyAsyncData(
  `search_${locale.value}`,
  () =>
    Promise.all([
      queryCollectionSearchSections(`guides_${locale.value}`),
      queryCollectionSearchSections("blog"),
    ]),
  {
    server: false,
    transform: data => data.flat(),
    watch: [locale],
  },
)

const { rootNavigation } = useNavigation(navigation)
provide("navigation", rootNavigation)

const isRoot = computed(() => route.path.startsWith(`/${locale.value}/guides`))
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator :height="2" />

    <div
      class="min-h-screen flex flex-col"
      :class="{ root: isRoot }"
    >
      <AppBanner />

      <Header />

      <NuxtLayout>
        <NuxtPage />
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

<style lang="css">
@reference "./assets/css/main.css";

@variant lg {
  .root {
    --ui-header-height: --spacing(28);
  }
}
</style>
