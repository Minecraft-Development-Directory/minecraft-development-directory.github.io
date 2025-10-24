<script setup lang="ts">
const route = useRoute();
const toast = useToast();
const { copy, copied } = useClipboard();
const site = useSiteConfig();

const mdPath = computed(() => `${site.url}/raw${route.path}.md`);

const items = [
  {
    label: "Copy Markdown link",
    icon: "i-lucide-link",
    onSelect() {
      copy(mdPath.value);
      toast.add({
        title: "Copied to clipboard",
        icon: "i-lucide-check-circle",
      });
    },
  },
  {
    label: "View as Markdown",
    icon: "i-simple-icons:markdown",
    target: "_blank",
    to: `/raw${route.path}.md`,
  },
];

async function copyPage() {
  copy(await $fetch<string>(`/raw${route.path}.md`));
}
</script>

<template>
  <UFieldGroup>
    <UButton
      label="Copy page"
      :icon="copied ? 'i-lucide-copy-check' : 'i-lucide-copy'"
      color="neutral"
      variant="outline"
      :ui="{
        leadingIcon: [copied ? 'text-primary' : 'text-neutral', 'size-3.5'],
      }"
      @click="copyPage"
    />
    <UDropdownMenu
      :items="items"
      :content="{
        align: 'end',
        side: 'bottom',
        sideOffset: 8,
      }"
      :ui="{
        content: 'w-48',
      }"
    >
      <UButton
        icon="i-lucide-chevron-down"
        size="sm"
        color="neutral"
        variant="outline"
        aria-label="Open copy actions menu"
      />
    </UDropdownMenu>
  </UFieldGroup>
</template>
