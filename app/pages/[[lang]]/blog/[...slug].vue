<script lang="ts" setup>
import { kebabCase } from "scule";
import { withLeadingSlash } from "ufo";
import type { BlogCollectionItem, ContentNavigationItem } from "@nuxt/content";
import { addPrerenderPath } from "../../../../utils/prerender";

definePageMeta({
  layout: "blog",
});

const { t, localizeLink } = useMddI18n();
const route = useRoute();

const appConfig = useAppConfig();
const navigation = inject<Ref<ContentNavigationItem[]>>("navigation");

const slug = computed(() => withLeadingSlash(String(route.params.slug)));

const { data: page } = await useAsyncData(`blog${slug.value}`, () =>
  queryCollection("blog").path(`/blog${slug.value}`).first()
);

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: t("common.error.title"),
    fatal: true,
  });
}

const title = page.value.seo?.title || page.value.title;
const description = page.value.seo?.description || page.value.description;

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
});

const { findBreadcrumb } = useNavigation(navigation!);
const breadcrumb = computed(() => findBreadcrumb(page.value?.path as string));

const headline = computed(() =>
  breadcrumb.value && breadcrumb.value.length > 0
    ? breadcrumb.value[0].label
    : undefined
);

defineOgImageComponent("Image", {
  title: page.value.title,
  description: page.value.description,
  headline: headline.value,
});

const transitionName = computed(() => {
  const id = page.value?.stem.replace("/", "-");
  return {
    title: `--blog-title-${id}`,
    summary: `--blog-summary-${id}`,
    date: `--blog-date-${id}`,
  };
});

interface Reading {
  minutes: number;
  words: number;
  time: string;
}

const readingTime = computed(() => {
  const time = page.value?.meta.readingTime as Reading | undefined;
  if (!time) return 0;

  return Math.ceil(time.minutes);
});
</script>

<template>
  <UPage v-if="page">
    <UPageHeader
      :headline="t('blog.post.headline')"
      :ui="{
        wrapper: 'flex-row items-center flex-wrap justify-between',
        title: 'blog-title',
        description: 'blog-summary',
      }"
    >
      <template #title>
        <span class="blog-title">{{ page.title }}</span>
      </template>

      <template #description>
        <span class="blog-summary">
          <MDC
            v-if="page.description"
            :value="page.description"
            unwrap="p"
            :cache-key="`${kebabCase(route.path)}-description`"
          />
        </span>
      </template>

      <template #headline>
        <UBreadcrumb :items="breadcrumb.map(localizeLink)" />
      </template>

      <template #link>
        <PageHeaderLinks />
      </template>

      <template #default>
        <div class="pt-4 flex flex-row gap-4 justify-between">
          <p class="italic text-muted text-sm blog-date">
            <ClientOnly>
              {{
                t("blog.post.published_on", { date: $d(new Date(page.date)) })
              }}
            </ClientOnly>
          </p>
          <p class="italic text-secondary text-sm">
            {{ t("blog.post.reading_time") }}:
            {{ t("blog.post.minutes", readingTime) }}
          </p>
        </div>
      </template>
    </UPageHeader>

    <UPageBody>
      <div class="flex flex-col h-full">
        <ContentRenderer
          v-if="page"
          :value="page"
          class="flex-1 animate-in fade-in"
        />
      </div>
    </UPageBody>

    <template v-if="page?.body?.toc?.links?.length" #right>
      <UContentToc
        highlight
        :title="appConfig.toc?.title || t('docs.toc')"
        :links="page.body?.toc?.links"
      >
        <template #bottom>
          <BlogAsideRightBottom :page="page" />
        </template>
      </UContentToc>
    </template>
  </UPage>
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
