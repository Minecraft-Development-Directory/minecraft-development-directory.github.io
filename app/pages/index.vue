<script lang="ts" setup>
const route = useRoute()
const { locale } = useMddI18n()
const { data: module } = await useFetch("/api/github/contributors.json")

const collectionName = computed(
  () => `index_${locale.value}` as `index_${typeof locale.value}`,
)

const { data: page } = await useAsyncData(collectionName.value, () =>
  queryCollection(collectionName.value).path(route.path).first(),
)
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  })
}

useSeoMeta({
  titleTemplate: "%s - Minecraft Development Directory",
  title: page.value.title,
  description: page.value.description,
  ogTitle: `${page.value.title} - Minecraft Development Directory`,
  ogDescription: page.value.description,
})

defineOgImageComponent("Image", {
  title: "Minecraft Development Directory",
  description: page.value.description,
})

const contributorsRef = ref(null)
const isContributorsInView = ref(false)

useIntersectionObserver(contributorsRef, ([entry]) => {
  isContributorsInView.value = entry?.isIntersecting || false
})
</script>

<template>
  <div v-if="page">
    <UPageHero
      orientation="horizontal"
      :ui="{
        container: 'pb-0 sm:pb-0 lg:py-0 min-h-[50vh]',
        title: 'lg:mt-16 sm:text-4xl',
        links: 'mb-16',
        description: 'text-balanced',
      }"
      title="Minecraft Development Directory"
      :description="page.hero.description"
      :links="page.hero.links"
    >
      <div class="flex flex-col gap-4">
        <Motion
          v-for="(feature, index) in page.hero.features"
          :key="feature.title"
          as-child
          :initial="{ opacity: 0, transform: 'translateX(-10px)' }"
          :while-in-view="{ opacity: 1, transform: 'translateX(0)' }"
          :transition="{ delay: 0.2 + 0.4 * index }"
          :in-view-options="{ once: true }"
        >
          <UPageFeature
            v-bind="feature"
            :to="feature.to ? feature.to : undefined"
            class="opacity-0"
          />
        </Motion>
      </div>
    </UPageHero>

    <USeparator />

    <UPageSection :ui="{ container: 'lg:py-16', root: 'bg-muted/25' }">
      <ul
        class="grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 lg:gap-x-8 lg:gap-y-8 xl:gap-y-10"
      >
        <Motion
          v-for="(feature, index) in page?.features"
          :key="feature.title"
          as="li"
          :initial="{ opacity: 0, transform: 'translateY(10px)' }"
          :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
          :transition="{ delay: 0.1 * index }"
          :in-view-options="{ once: true }"
          class="flex items-start gap-x-3 relative group"
        >
          <UPageFeature
            :title="feature.title"
            :description="feature.description"
            :to="feature.to"
          >
            <template #leading>
              <div class="relative p-3">
                <svg
                  class="absolute inset-0"
                  viewBox="0 0 44 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="6.5"
                    x2="6.5"
                    y2="44"
                    stroke="var(--ui-border)"
                  />
                  <line
                    x1="38.5"
                    x2="38.5"
                    y2="44"
                    stroke="var(--ui-border)"
                  />
                  <line
                    y1="5.5"
                    x2="44"
                    y2="5.5"
                    stroke="var(--ui-border)"
                  />
                  <line
                    y1="37.5"
                    x2="44"
                    y2="37.5"
                    stroke="var(--ui-border)"
                  />
                  <circle
                    cx="6.53613"
                    cy="5.45508"
                    r="1.5"
                    fill="var(--ui-border-accented)"
                  />
                  <circle
                    cx="38.5957"
                    cy="5.45508"
                    r="1.5"
                    fill="var(--ui-border-accented)"
                  />
                  <circle
                    cx="6.53711"
                    cy="37.4551"
                    r="1.5"
                    fill="var(--ui-border-accented)"
                  />
                  <circle
                    cx="38.5957"
                    cy="37.4551"
                    r="1.5"
                    fill="var(--ui-border-accented)"
                  />
                </svg>
                <UIcon
                  :name="feature.icon"
                  class="size-5 shrink-0 text-primary"
                />
              </div>
            </template>
          </UPageFeature>
        </Motion>
      </ul>
    </UPageSection>

    <USeparator />

    <UPageSection
      :title="page.community.title"
      :description="page.community.description"
      :links="page.community.links"
      orientation="horizontal"
      :ui="{
        features: 'flex items-start justify-start gap-4 lg:gap-8',
        container: 'lg:justify-items-start lg:items-start',
      }"
    >
      <div
        ref="contributorsRef"
        class="p-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 overflow-hidden flex relative"
      >
        <LazyHomeContributors :contributors="module?.contributors" />
      </div>
    </UPageSection>
  </div>
</template>
