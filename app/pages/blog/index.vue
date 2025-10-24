<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

definePageMeta({
  layout: "blog",
});

const { locale, t } = useMddI18n();
const route = useRoute();

const pageSize = 10;
const currentPage = ref(Number(route.query.page) || 1);

const { data: posts } = await useAsyncData(`blog-posts-${locale.value}`, () =>
  queryCollection(`blog`)
    //.path(route.path)
    .order("date", "DESC")
    .all()
);

const totalPosts = computed(() => posts.value?.length || 0);
const totalPages = computed(() => Math.ceil(totalPosts.value / pageSize));

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return posts.value?.slice(start, start + pageSize) || [];
});

function goToPage(page: number) {
  currentPage.value = page;
}
</script>

<template>
  <div class="container mx-auto py-8 flex-1">
    <h1 class="text-3xl font-bold mb-6">
      {{ t("blog.title", "Blog Posts") }}
    </h1>
    <div v-if="paginatedPosts.length === 0" class="text-gray-500">
      {{ t("blog.no_posts", "No posts found.") }}
    </div>
    <div v-else>
      <UCard
        v-for="post in paginatedPosts"
        :key="post.path"
        class="mb-4 bg-muted"
      >
        <template #header>
          <h2 class="text-xl font-semibold">
            <NuxtLink :to="post.path">{{ post.title }}</NuxtLink>
          </h2>
        </template>
        <div>{{ post.description }}</div>
        <template #footer>
          <div
            class="flex flex-col lg:flex-row gap-4 justify-between items-center"
          >
            <span class="text-muted text-sm">
              {{ post.date ? new Date(post.date).toLocaleDateString() : "" }}
            </span>
            <NuxtLink :to="post.path" class="text-primary">
              {{ t("blog.read_more", "Read more") }}
            </NuxtLink>
          </div>
        </template>
      </UCard>
      <UPagination
        v-if="totalPages > 1"
        :model-value="currentPage"
        :page-count="totalPages"
        class="mt-6"
        @update:model-value="goToPage"
      />
    </div>
  </div>
</template>
