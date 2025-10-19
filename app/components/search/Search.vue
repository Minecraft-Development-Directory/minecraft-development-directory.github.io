<script lang="ts" setup>
import type { ContentNavigationItem } from "@nuxt/content";

interface ContentSearchFile {
  id: string;
  title: string;
  titles: string[];
  level: number;
  content: string;
}

defineProps<{
  files?: ContentSearchFile[];
  navigation?: ContentNavigationItem[];
}>();

const fullscreen = ref(false);
const searchTerm = ref("");

const { links } = useSearch();
</script>

<template>
  <UContentSearch
    v-model:search-term="searchTerm"
    :links="links"
    :files="files"
    :navigation="navigation"
    :fullscreen="fullscreen"
    :fuse="{ resultLimit: 115 }"
  />
</template>

<style></style>
