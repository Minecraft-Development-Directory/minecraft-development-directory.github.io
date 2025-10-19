<script setup lang="ts">
const { localePath } = useMddI18n();
</script>

<template>
  <NuxtLink
    :to="localePath('/')"
    class="flex items-end gap-2 font-bold text-xl text-highlighted min-w-0 focus-visible:outline-primary shrink-0"
    aria-label="Minecraft Development Directory Home"
  >
    <Logo class="w-auto h-6 shrink-0" />
  </NuxtLink>
</template>
