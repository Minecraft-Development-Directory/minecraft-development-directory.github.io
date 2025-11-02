<script setup lang="ts">
const appConfig = useAppConfig()
const colorMode = useColorMode()

const { t } = useMddI18n()

const modes = [
  { label: "light", icon: appConfig.ui.icons.light },
  { label: "dark", icon: appConfig.ui.icons.dark },
  { label: "system", icon: appConfig.ui.icons.system },
]
const mode = computed({
  get() {
    return colorMode.value
  },
  set(option) {
    colorMode.preference = option
  },
})
</script>

<template>
  <UPopover :ui="{ content: 'w-72 px-6 py-4 flex flex-col gap-4' }">
    <template #default="{ open }">
      <UTooltip :text="t('header.color-picker.button')">
        <UButton
          icon="i-lucide-swatch-book"
          color="neutral"
          :variant="open ? 'soft' : 'ghost'"
          square
          :aria-label="t('header.color-picker.button')"
          :ui="{ leadingIcon: 'text-primary' }"
        />
      </UTooltip>
    </template>

    <template #content>
      <fieldset>
        <legend class="text-[11px] leading-none font-semibold mb-2">
          {{ t("header.color-picker.title") }}
        </legend>

        <div class="grid grid-cols-3 gap-1 -mx-2">
          <ThemePickerButton
            v-for="m in modes"
            :key="m.label"
            v-bind="m"
            :selected="colorMode.preference === m.label"
            @click="mode = m.label"
          />
        </div>
      </fieldset>
    </template>
  </UPopover>
</template>
