<template>
  <div
    class="group font-mono text-sm/6 border border-muted bg-muted rounded-md px-4 py-3 whitespace-pre-wrap break-words overflow-x-auto focus:outline-none language-ts"
  >
    <ul class="list-none p-0 m-0">
      <FolderStructureTreeItem
        v-for="(item, index) in structure"
        :key="index"
        :item="item"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import type { TreeItem } from "./TreeItem.vue";
</script>

<script lang="ts" setup>
// Define the component's props to accept the data
defineProps<{ structure: TreeItem[] }>();
</script>
