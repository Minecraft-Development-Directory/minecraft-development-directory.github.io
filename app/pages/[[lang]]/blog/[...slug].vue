<script lang="ts" setup>
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

// Add the page path to the prerender list
addPrerenderPath(`/raw${route.path}.md`);

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

defineOgImageComponent("blog", {
  headline: breadcrumb.value[0],
});

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
    `${page.value?.stem}.${page.value?.extension}`,
  ]
    .filter(Boolean)
    .join("/");
});

const transitionName = computed(() => {
  const id = page.value?.stem.replace("/", "-");
  return {
    title: `--blog-title-${id}`,
    summary: `--blog-summary-${id}`,
  };
});
</script>

<template>
  <UPage v-if="page">
    <div
      class="reading-progress fixed z-60 left-0 top-0 w-full h-1 origin-[0_50%] bg-primary animate-[grow-progress_auto_linear]"
    />

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
        <span class="blog-summary">{{ page.description }}</span>
      </template>

      <template #headline>
        <UBreadcrumb :items="breadcrumb.map(localizeLink)" />
      </template>

      <template #link>
        <UButton
          v-for="(link, index) in (page as BlogCollectionItem).links"
          :key="index"
          size="sm"
          v-bind="link"
        />

        <PageHeaderLinks />
      </template>
    </UPageHeader>

    <UPageBody>
      <div class="flex flex-col h-full">
        <ContentRenderer
          v-if="page"
          :value="page"
          class="flex-1 animate-in fade-in"
        />

        <USeparator>
          <div v-if="github" class="flex items-center gap-2 text-sm text-muted">
            <UButton
              variant="link"
              color="neutral"
              :to="editLink"
              target="_blank"
              icon="i-lucide-pen"
              :ui="{ leadingIcon: 'size-4' }"
            >
              {{ t("docs.edit") }}
            </UButton>
            <span>{{ t("common.or") }}</span>
            <UButton
              variant="link"
              color="neutral"
              :to="`${github.url}/issues/new/choose`"
              target="_blank"
              icon="i-lucide-alert-circle"
              :ui="{ leadingIcon: 'size-4' }"
            >
              {{ t("docs.report") }}
            </UButton>
          </div>
        </USeparator>
      </div>
    </UPageBody>

    <template v-if="page?.body?.toc?.links?.length" #right>
      <UContentToc
        highlight
        :title="appConfig.toc?.title || t('docs.toc')"
        :links="page.body?.toc?.links"
      >
        <template #bottom>
          <AsideRightBottom />
        </template>
      </UContentToc>
    </template>
  </UPage>
</template>

<style lang="css" scoped>
html {
  scroll-timeline: --page-scroll block;
}

@keyframes grow-progress {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

.reading-progress {
  animation-timeline: --page-scroll;
}
</style>

<style lang="css" scoped>
.blog-title {
  view-transition-name: v-bind("transitionName.title");
}

.blog-summary {
  view-transition-name: v-bind("transitionName.summary");
}
</style>
