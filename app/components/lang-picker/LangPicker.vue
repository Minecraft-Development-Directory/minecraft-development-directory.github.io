<script lang="ts" setup>
const { locales, locale, switchLocalePath } = useMddI18n();
</script>

<template>
  <UPopover mode="hover" :content="{ align: 'end' }">
    <UTooltip text="Change language">
      <UButton
        color="neutral"
        variant="ghost"
        class="size-8"
        icon="i-lucide-globe"
        aria-label="Change language"
      />
    </UTooltip>

    <template #content>
      <ul class="flex flex-col">
        <li v-for="localeItem in locales" :key="localeItem.code">
          <NuxtLink
            class="flex justify-between py-1.5 px-2 gap-1 hover:bg-muted"
            :to="switchLocalePath(localeItem.code) as string"
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
