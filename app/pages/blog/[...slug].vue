<script lang="ts" setup>
import type {
  ContentNavigationItem,
  DocsEnCollectionItem,
} from "@nuxt/content";
import { findPageHeadline } from "@nuxt/content/utils";
import { kebabCase } from "scule";
import { addPrerenderPath } from "../../../../utils/prerender";

definePageMeta({
  layout: "blog",
});

const route = useRoute();
const { locale, t } = useMddI18n();
const appConfig = useAppConfig();
const navigation = inject<Ref<ContentNavigationItem[]>>("navigation");

const collectionName = computed(
  () => `docs_${locale.value}` as `docs_${typeof locale.value}`
);

const [{ data: page }, { data: surround }] = await Promise.all([
  useAsyncData(kebabCase(route.path), () =>
    queryCollection(collectionName.value).path(route.path).first()
  ),
  useAsyncData(`${kebabCase(route.path)}-surround`, () =>
    queryCollectionItemSurroundings(collectionName.value, route.path, {
      fields: ["description"],
    })
  ),
]);

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
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

const headline = ref(findPageHeadline(navigation?.value, page.value.path));
watch(
  () => navigation?.value,
  () => {
    headline.value =
      findPageHeadline(navigation?.value, page.value?.path) || headline.value;
  }
);

defineOgImageComponent("blog", {
  headline: headline.value,
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
</script>

<template>
  <UPage v-if="page">
    <UPageHeader
      :title="page.title"
      :description="page.description"
      :headline="headline"
      :ui="{
        wrapper: 'flex-row items-center flex-wrap justify-between',
      }"
    >
      <template #link>
        <UButton
          v-for="(link, index) in (page as DocsEnCollectionItem).links"
          :key="index"
          size="sm"
          v-bind="link"
        />

        <PageHeaderLinks />
      </template>
    </UPageHeader>

    <UPageBody>
      <ContentRenderer v-if="page" :value="page" />

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
      <UContentSurround :surround="surround" />
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
