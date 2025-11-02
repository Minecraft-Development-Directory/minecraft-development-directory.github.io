<script lang="ts" setup>
const { t } = useMddI18n()
const { gameVersion, gameVersions, modLoader, modLoaders } = useGameConfig()

const versions = computed(() => Object.values(gameVersions.value))
</script>

<template>
  <UPopover :ui="{ content: 'w-72 px-6 py-4 flex flex-col gap-4' }">
    <template #default="{ open }">
      <UTooltip :text="t('docs.config.button')">
        <UButton
          icon="i-lucide-settings-2"
          color="neutral"
          :variant="open ? 'soft' : 'ghost'"
          square
          :aria-label="t('docs.config.button')"
          :ui="{ leadingIcon: 'text-primary' }"
        />
      </UTooltip>
    </template>

    <template #content>
      <fieldset>
        <legend class="text-[11px] leading-none font-semibold mb-2">
          {{ t("docs.config.mod-loaders.title") }}
        </legend>

        <div class="grid grid-cols-3 gap-1 -mx-2">
          <GameConfigSelectorButton
            v-for="loader in modLoaders"
            :key="loader"
            :label="loader"
            :selected="modLoader === loader"
            @click="modLoader = loader"
          />
        </div>
      </fieldset>

      <fieldset>
        <legend class="text-[11px] leading-none font-semibold mb-2">
          {{ t("docs.config.game-versions.title") }}
        </legend>

        <div class="-mx-2">
          <USelectMenu
            v-model="gameVersion"
            class="w-full"
            virtualize
            :items="versions"
            size="sm"
          />
        </div>
      </fieldset>
    </template>
  </UPopover>
</template>

<style></style>
