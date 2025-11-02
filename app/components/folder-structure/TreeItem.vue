<template>
  <li>
    <div
      :class="[
        'px-2 py-1 gap-2 rounded-md flex items-center select-none',
        {
          'cursor-pointer hover:bg-accented transition-colors duration-150 ease-in':
            item.type === 'folder',
        },
      ]"
      @click="toggle"
    >
      <UIcon
        :name="iconData.icon"
        class="size-4 shrink-0"
        :class="iconData.color"
        :style="{ color: iconData.color }"
      />

      <span>{{ itemName }}</span>
    </div>

    <ul
      v-show="isOpen"
      v-if="item.type === 'folder'"
      class="ml-4 pl-2 border-l border-accented"
    >
      <TreeItem
        v-for="(child, index) in item.children"
        :key="index"
        :item="child"
      />
    </ul>
  </li>
</template>

<script lang="ts">
interface TreeItemFile {
  name: string;
  type: "file";
}

interface TreeItemFolder {
  name: string;
  type: "folder";
  children: TreeItem[];
}

export type TreeItem = TreeItemFile | TreeItemFolder;

interface IconData {
  icon: string;
  color?: string;
}

interface IconMap {
  folder: {
    open: IconData;
    closed: IconData;
  };
  file: {
    [key: string]: IconData;
  };
}

const ICON_MAP = Object.freeze({
  folder: {
    open: { icon: "i-lucide-folder-open", color: "var(--ui-primary)" },
    closed: { icon: "i-lucide-folder", color: "var(--ui-primary)" },
  },
  file: {
    ts: { icon: "i-cib-typescript", color: "var(--color-flexoki-bl)" },
    js: { icon: "i-cib-javascript", color: "var(--color-flexoki-ye-2)" },
    json: { icon: "i-cib-json", color: "var(--color-flexoki-base-500)" },
    md: { icon: "i-cib-markdown" },
    gradle: { icon: "i-cib-gradle", color: "var(--color-flexoki-cy)" },
    java: { icon: "i-cib-java", color: "var(--color-flexoki-re)" },
    kotlin: { icon: "i-cib-kotlin", color: "var(--color-flexoki-ma)" },
    xml: { icon: "i-lucide-code-xml", color: "var(--color-flexoki-or)" },
    plaintext: { icon: "i-lucide-file-text" },
  },
} satisfies IconMap);

type IconType = typeof ICON_MAP.file;
function isIconType(key: string): key is keyof IconType {
  return key in ICON_MAP.file;
}
</script>

<script lang="ts" setup>
// Define the component's props
const props = defineProps<{ item: TreeItem }>();

// State
const isOpen = ref(true); // Controls the expansion state

const itemName = computed(() =>
  props.item.type === "folder" ? props.item.name + "/" : props.item.name
);

const iconData = computed<IconData>(() => {
  // Determine the correct Font Awesome icon
  if (props.item.type === "folder") {
    // Folder icons: open or closed
    return isOpen.value ? ICON_MAP.folder.open : ICON_MAP.folder.closed;
  } else {
    // File icons: determined by extension or type

    // Extract file extension (without dot)
    const fileExt =
      props.item.name.split(".").pop()?.toLowerCase() || "plaintext";

    // Return the corresponding icon data or default to plaintext
    return isIconType(fileExt)
      ? ICON_MAP.file[fileExt]
      : ICON_MAP.file.plaintext;
  }
});

// Methods
function toggle() {
  if (props.item.type === "folder") {
    isOpen.value = !isOpen.value;
  }
}
</script>
