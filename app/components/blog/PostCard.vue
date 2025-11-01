<script lang="ts" setup>
import type { BlogCollectionItem } from "@nuxt/content";

const { post } = defineProps<{
  post: BlogCollectionItem;
}>();

const { t, localePath } = useMddI18n();

function formatDate(post: { date: string }) {
  return $d(new Date(post.date));
}

const transitionName = computed(() => {
  const id = post.stem.replace("/", "-");
  return {
    title: `--blog-title-${id}`,
    summary: `--blog-summary-${id}`,
    date: `--blog-date-${id}`,
  };
});
</script>

<template>
  <UBlogPost
    :to="localePath(post.path)"
    :ui="{
      title: 'pointer-events-none',
      description: 'pointer-events-none',
    }"
  >
    <template #title>
      <span class="blog-title">
        {{ post.title }}
      </span>
    </template>

    <template #description>
      <span class="blog-summary">
        {{ post.description }}
      </span>
    </template>

    <template #date>
      <span class="blog-date">
        {{ formatDate(post) }}
      </span>
    </template>

    <template v-if="post.draft" #badge>
      <UBadge variant="subtle" color="warning">Draft</UBadge>
    </template>

    <template #footer>
      <div
        class="flex flex-col gap-4 items-end px-4 py-2 border-t border-default"
      >
        <NuxtLinkLocale to="post.path" class="text-primary">
          {{ t("blog.read_more", "Read more") }}
        </NuxtLinkLocale>
      </div>
    </template>
  </UBlogPost>
</template>

<style lang="css" scoped>
.blog-title {
  view-transition-name: v-bind("transitionName.title");
}

.blog-summary {
  view-transition-name: v-bind("transitionName.summary");
}
.blog-date {
  view-transition-name: v-bind("transitionName.date");
}
</style>
