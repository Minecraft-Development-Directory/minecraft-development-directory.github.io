<script setup lang="ts">
import { withoutTrailingSlash } from "ufo"
import i18nConfig from "~~/i18n/i18n.config"
import { onlyIf } from "~~/utils/collections"
import { mergeNav, mergeSearchSections } from "~~/utils/mergeNav"

const route = useRoute()
const { locale } = useMddI18n()
const fallbackLocale = i18nConfig.fallbackLocale

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
  () => Promise.all([
    // Query current locale navigation only if it's different from fallback
    onlyIf(
      locale.value !== fallbackLocale,
      () => queryCollectionNavigation(`guides_${locale.value}`, ["description", "gameVersion", "modLoader"]),
    ),

    queryCollectionNavigation(`guides_${fallbackLocale}`, [
      "description",
      "gameVersion",
      "modLoader",
    ]),
    queryCollectionNavigation("blog", ["description"]),
  ]),
  {
    server: true,
    transform: ([currentLocaleNav, fallbackLocaleNav, blogNav]) => {
      if (!currentLocaleNav) {
        // If there is no current locale navigation, return fallback + blog
        return [...fallbackLocaleNav, ...blogNav.flat()]
      }

      // Merge current locale navigation with fallback locale navigation
      const merged = mergeNav(currentLocaleNav, fallbackLocaleNav, {
        targetLocale: locale.value,
        fallbackLocale,
      })

      return [...merged, ...blogNav.flat()]
    },
    watch: [locale],
  },
)

const { data: files } = useLazyAsyncData(
  `search_${locale.value}`,
  async () => Promise.all([
    // Query current locale search sections only if it's different from fallback
    onlyIf(
      locale.value !== fallbackLocale,
      () => queryCollectionSearchSections(`guides_${locale.value}`),
    ),
    queryCollectionSearchSections(`guides_${fallbackLocale}`),
    queryCollectionSearchSections("blog"),
  ]),

  {
    server: false,
    transform: ([currentSections, fallbackSections, blogSections]) => {
      if (!currentSections) {
        // If there is no current locale search sections, return fallback + blog
        return [...fallbackSections, ...blogSections.flat()]
      }
      // Merge current locale search sections with fallback locale search sections
      const merged = mergeSearchSections(currentSections, fallbackSections, {
        targetLocale: locale.value,
        fallbackLocale,
      })

      return [...merged, ...blogSections.flat()]
    },
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
