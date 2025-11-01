<script setup lang="ts">
defineProps<{
  label: string;
  selected?: boolean;
}>();
</script>

<template>
  <UButton
    size="sm"
    color="neutral"
    variant="outline"
    :label="label"
    class="capitalize ring-default rounded-md text-[11px]"
    :class="[selected ? 'bg-elevated' : 'hover:bg-elevated/50']"
  />
</template>
