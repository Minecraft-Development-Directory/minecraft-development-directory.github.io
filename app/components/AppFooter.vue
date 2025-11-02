<script setup lang="ts">
const { links } = useFooter()
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
        Published under
        <span
          class="text-highlighted border-b border-dashed border-(--ui-text-dimmed) hover:border-solid hover:border-[currentColor] transition-colors duration-100"
        >
          MIT License
        </span>
      </NuxtLink>
    </template>

    <UNavigationMenu
      :items="links"
      variant="link"
      color="neutral"
    />

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
