<script setup lang="ts">
import type { ContentNavigationItem } from "@nuxt/content";

const navigation = inject<Ref<ContentNavigationItem[]>>("navigation");

const route = useRoute();
const { mobileLinks } = useHeader();
</script>

<template>
  <UNavigationMenu
    orientation="vertical"
    :items="mobileLinks"
    class="-mx-2.5"
    :ui="{ list: 'flex flex-col gap-2' }"
  />

  <template v-if="route.path.startsWith('/docs/')">
    <USeparator type="dashed" class="mt-4 mb-6" />

    <!-- <div class="flex flex-col gap-2 mb-5.5">
      <FrameworkTabs />
    </div> -->

    <UContentNavigation
      :navigation="navigation"
      highlight
      :ui="{ linkTrailingBadge: 'font-semibold uppercase' }"
    />
  </template>
</template>
