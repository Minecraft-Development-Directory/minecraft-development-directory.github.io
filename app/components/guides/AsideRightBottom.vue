<script setup lang="ts">
import type { GuidesEnCollectionItem } from "@nuxt/content";

const { t } = useMddI18n();
const appConfig = useAppConfig();

const { page } = defineProps<{
  page: GuidesEnCollectionItem;
}>();

const github = computed(() => (appConfig.github ? appConfig.github : null));

const editLink = computed(() => {
  if (!github.value) {
    return;
  }

  return [
    github.value.url,
    "edit",
    github.value.branch,
    github.value.rootDir,
    "content",
    `${page?.stem}.${page?.extension}`,
  ]
    .filter(Boolean)
    .join("/");
});

const reportLink = computed(() => {
  if (!github.value) {
    return;
  }

  const title = encodeURIComponent(`[Bug] Issue in \`${page?.id}\``);
  const body = encodeURIComponent(
    `Found a bug in the following page: \`${page.id}\``
  );

  return [
    github.value.url,
    "issues",
    "new",
    `?title=${title}&body=${body}&labels=bug&type=bug`,
  ]
    .filter(Boolean)
    .join("/");
});

const communityLinks = computed(() => [
  {
    icon: "i-lucide-file-pen",
    label: t("docs.edit"),
    to: editLink.value,
    target: "_blank",
  },
  {
    icon: "i-lucide-bug",
    label: t("docs.report"),
    to: reportLink.value,
    target: "_blank",
  },
  {
    icon: "i-lucide-star",
    label: t("docs.star_repo"),
    to: `https://github.com/minecraft-development-directory/minecraft-development-directory.github.io`,
    target: "_blank",
  },
]);
</script>

<template>
  <USeparator v-if="appConfig.toc?.bottom?.links?.length" type="dashed" />

  <UPageLinks title="Community" :links="communityLinks" />
</template>
