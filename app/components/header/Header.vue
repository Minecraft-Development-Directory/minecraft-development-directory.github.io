<script lang="ts" setup>
const route = useRoute();
const { desktopLinks } = useHeader();

const { localePath } = useMddI18n();
</script>

<template>
  <UHeader :ui="{ left: 'min-w-0' }" class="flex flex-col">
    <template #left>
      <HeaderLogo />
    </template>

    <UNavigationMenu :items="desktopLinks" variant="link" />

    <template #right>
      <ClientOnly>
        <LangPicker />
      </ClientOnly>

      <ThemePicker />

      <UTooltip text="Search" :kbds="['meta', 'K']">
        <UContentSearchButton />
      </UTooltip>

      <UTooltip text="Open on Github" class="hidden lg:flex">
        <UButton
          color="neutral"
          variant="ghost"
          to="https://github.com/Minecraft-Development-Directory/minecraft-development-directory.github.io"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
        />
      </UTooltip>
    </template>

    <template #body>
      <HeaderBody />
    </template>

    <template v-if="route.path.startsWith(localePath('/docs/'))" #bottom>
      <HeaderBottom />
    </template>
  </UHeader>
</template>
