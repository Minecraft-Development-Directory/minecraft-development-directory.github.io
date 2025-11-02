<script lang="ts" setup>
const { locales, locale, t } = useMddI18n()
</script>

<template>
  <UPopover
    :content="{ align: 'end' }"
    :ui="{ content: 'w-48 px-4 py-4 pb-3 flex flex-col gap-4' }"
  >
    <template #default="{ open }">
      <UTooltip :text="t('header.lang-picker.button')">
        <UButton
          icon="i-lucide-globe"
          color="neutral"
          :variant="open ? 'soft' : 'ghost'"
          square
          :aria-label="t('header.lang-picker.button')"
        />
      </UTooltip>
    </template>

    <template #content>
      <fieldset>
        <legend class="text-[11px] leading-none font-semibold mb-2">
          {{ t("header.lang-picker.title") }}
        </legend>
        <ul class="flex flex-col">
          <li
            v-for="localeItem in locales"
            :key="localeItem.code"
          >
            <SwitchLocalePathLink
              class="flex py-1.5 px-2 gap-1 hover:bg-muted rounded-md"
              :locale="localeItem.code"
              :class="{ 'text-primary': localeItem.code === locale }"
              :aria-label="localeItem.name"
            >
              <span class="size-5 text-center">
                <UIcon
                  name="i-lucide-check"
                  :class="{ 'opacity-0': localeItem.code !== locale }"
                />
              </span>
              <span class="text-sm">
                {{ localeItem.name }}
              </span>
            </SwitchLocalePathLink>
          </li>
        </ul>
      </fieldset>
    </template>
  </UPopover>
</template>
