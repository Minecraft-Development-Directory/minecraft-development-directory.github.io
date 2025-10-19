import type { DefinedCollection } from "@nuxt/content";
import { defineContentConfig, defineCollection, z } from "@nuxt/content";
import { useNuxt } from "@nuxt/kit";
import type { NuxtI18nOptions } from "@nuxtjs/i18n";
import { joinURL } from "ufo";

const { options } = useNuxt();
const cwd = joinURL(options.rootDir, "content");
const locales = options.i18n.locales as Exclude<
  NuxtI18nOptions["locales"],
  undefined
>;

const Button = z.object({
  label: z.string(),
  icon: z.string().optional(),
  leadingIcon: z.string().optional(),
  trailingIcon: z.string().optional(),
  to: z.string().optional(),
  target: z.enum(["_blank", "_self"]).optional(),
  id: z.string().optional(),
  class: z.string().optional(),
});

const PageFeature = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  to: z.string().optional(),
  target: z.enum(["_blank", "_self"]).optional(),
});

const PageHero = z.object({
  title: z.string(),
  description: z.string(),
  links: z.array(Button),
});

const PageSection = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
  links: z.array(Button).optional(),
  features: z.array(PageFeature).optional(),
});

const Page = z.object({
  title: z.string(),
  description: z.string(),
  hero: PageHero,
});

const collections: Record<string, DefinedCollection> = {};

for (const locale of locales) {
  const code = typeof locale === "string" ? locale : locale.code;

  collections[`docs_${code}`] = defineCollection({
    type: "page",
    source: {
      cwd,
      include: `${code}/guildes/**/*`,
      prefix: `/${code}`,
    },
    schema: z.object({
      navigation: z.object({
        title: z.string().optional(),
      }),
      links: z.array(Button),
    }),
  });

  collections[`index_${code}`] = defineCollection({
    type: "page",
    source: joinURL(cwd, code, "index.yml"),
    schema: Page.extend({
      hero: PageHero.extend({
        features: z.array(PageFeature),
      }),
      features: z.array(PageFeature),
      community: PageSection,
    }),
  });

  collections[`blog_${code}`] = defineCollection({
    type: "page",
    source: {
      cwd,
      include: `${code}/blog/**/*`,
      prefix: `/${code}/blog`,
    },
  });
}

export default defineContentConfig({ collections });
