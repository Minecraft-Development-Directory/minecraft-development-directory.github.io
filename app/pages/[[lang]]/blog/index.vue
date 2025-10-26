<script setup lang="ts">
import type { BlogCollectionItem } from "@nuxt/content";
import { ref, computed } from "vue";

definePageMeta({
  layout: "blog",
});

const { t, localizeLink } = useMddI18n();
const route = useRoute();
const router = useRouter();
const navigation = inject<Ref<ContentNavigationItem[]>>("navigation");

const pageSize = 10;
const currentPage = ref(Number(route.query.page) || 1);

const isProd = process.env.NODE_ENV === "production";

watch(
  () => route.query.page,
  (val) => {
    currentPage.value = Number(val) || 1;
  }
);

const { data: total } = await useAsyncData(`blog-total`, () =>
  queryCollection(`blog`).count("*")
);

const totalPosts = computed(() => total.value || 0);
const totalPages = computed(() => Math.ceil(totalPosts.value / pageSize));

const { data: posts } = await useAsyncData(
  () => `blog-posts-${currentPage.value}`,
  () => {
    let query = queryCollection(`blog`);

    if (isProd) {
      query = query.where("draft", "=", false);
    }

    return query
      .order("date", "DESC")
      .limit(pageSize)
      .skip((currentPage.value - 1) * pageSize)
      .all();
  },
  { watch: [currentPage] }
);

const postsByYear = computed(() => {
  if (!posts.value) return [];

  const map = new Map<string, BlogCollectionItem[]>();

  for (const post of posts.value) {
    const year = post.date ? new Date(post.date).getFullYear() : "Unknown";
    if (!map.has(`${year}`)) map.set(`${year}`, []);
    map.get(`${year}`)!.push(post);
  }

  // Sort years descending (latest first)
  return Array.from(map.entries()).sort((a, b) => b[0].localeCompare(a[0]));
});

const { findBreadcrumb } = useNavigation(navigation!);
const breadcrumb = computed(() => findBreadcrumb("/blog"));

function goToPage(page: number) {
  router.push({ query: { ...route.query, page } });
  window.scrollTo(0, 0);
}
</script>

<template>
  <UPage>
    <UPageHeader :title="t('blog.title', 'Blog Posts')">
      <template #headline>
        <UBreadcrumb :items="breadcrumb.map(localizeLink)" />
      </template>
    </UPageHeader>

    <UPageBody>
      <div v-if="!posts || Object.keys(posts).length === 0" class="text-muted">
        {{ t("blog.no_posts") }}
      </div>
      <div v-else>
        <section
          v-for="[year, yearPosts] in postsByYear"
          :key="year"
          class="pb-6 last:pb-8 not-first:border-t border-default pt-6 grid grid-cols-1 lg:grid-cols-[--spacing(48)_auto]"
        >
          <div>
            <h3
              class="text-3xl font-semibold text-secondary pb-4 mb-4 text-center sticky top-20"
            >
              <span class="sr-only">Posts for the year</span>
              {{ year }}
            </h3>
          </div>

          <div class="flex flex-col gap-6">
            <UBlogPosts orientation="vertical">
              <BlogPostCard
                v-for="post in yearPosts"
                :key="post.stem"
                :post="post"
              />
            </UBlogPosts>
          </div>
        </section>

        <div
          v-if="totalPages > 1"
          class="flex justify-center border-t border-default pt-4"
        >
          <UPagination
            :model-value="currentPage"
            :total="totalPosts"
            @update:page="goToPage"
          />
        </div>
      </div>
    </UPageBody>
  </UPage>
</template>
