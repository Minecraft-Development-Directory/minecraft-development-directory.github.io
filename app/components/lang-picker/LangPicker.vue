<script lang="ts" setup>
const { locales, locale, switchLocalePath } = useMddI18n();
</script>

<template>
  <UPopover
    :content="{ align: 'end' }"
    :ui="{ content: 'w-48 p-2 flex flex-col gap-4' }"
  >
    <template #default="{ open }">
      <UTooltip text="Change language">
        <UButton
          icon="i-lucide-globe"
          color="neutral"
          :variant="open ? 'soft' : 'ghost'"
          square
          aria-label="Change language"
        />
      </UTooltip>
    </template>

    <template #content>
      <ul class="flex flex-col">
        <li v-for="localeItem in locales" :key="localeItem.code">
          <NuxtLink
            class="flex py-1.5 px-2 gap-1 hover:bg-muted rounded-md"
            :to="switchLocalePath(localeItem.code)"
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
          </NuxtLink>
        </li>
      </ul>
    </template>
  </UPopover>
</template>
