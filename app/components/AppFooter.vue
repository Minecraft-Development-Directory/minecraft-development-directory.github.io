<script setup lang="ts">
const route = useRoute();
const { links } = useFooter();
</script>

<template>
  <USeparator class="h-px" />

  <UFooter>
    <template #left>
      <NuxtLink
        to="https://github.com/Minecraft-Development-Directory/minecraft-development-directory.github.io"
        target="_blank"
        class="text-sm text-muted"
      >
        Published under <span class="text-highlighted">MIT License</span>
      </NuxtLink>
    </template>

    <UNavigationMenu :items="links" variant="link" color="neutral" />

    <template #right>
      <UButton
        aria-label="Minecraft Development Directory on GitHub"
        icon="i-simple-icons-github"
        to="https://github.com/Minecraft-Development-Directory/minecraft-development-directory.github.io"
        target="_blank"
        color="neutral"
        variant="ghost"
        size="sm"
      />
    </template>
  </UFooter>
</template>
