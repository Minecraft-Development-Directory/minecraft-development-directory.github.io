<script setup lang="ts">
import type { ContentNavigationItem } from "@nuxt/content"
import { mapContentNavigation } from "@nuxt/ui/utils/content"
import GameConfigSelector from "../game-config-selector/GameConfigSelector.vue"

const route = useRoute()

const navigation = inject<Ref<ContentNavigationItem[]>>("navigation")

const items = computed(() =>
  mapContentNavigation(
    navigation?.value.map(item => ({ ...item, children: undefined })) ?? [],
  )?.map((item) => {
    return {
      ...item,
      to: item.to as string,
      active: route.path.startsWith(item.to as string),
    }
  }),
)
</script>

<template>
  <USeparator class="hidden lg:flex" />

  <UContainer class="hidden lg:flex items-center justify-between">
    <UNavigationMenu
      :items="items"
      variant="pill"
      highlight
      class="-mx-2.5 -mb-px"
    />

    <GameConfigSelector />
  </UContainer>
</template>
