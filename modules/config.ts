import { createResolver, defineNuxtModule } from "@nuxt/kit";
import { existsSync } from "node:fs";
import { join } from "node:path";

export default defineNuxtModule({
  meta: {
    name: "config",
  },
  async setup(_options, nuxt) {
    /*
     ** I18N
     */
    const { resolve } = createResolver(import.meta.url);

    // Filter locales to only include existing ones
    const filteredLocales = nuxt.options.i18n.locales!.filter((locale) => {
      const localeCode = typeof locale === "string" ? locale : locale.code;

      // Check for JSON locale file
      const localeFilePath = resolve("../i18n/locales", `${localeCode}.json`);
      const hasLocaleFile = existsSync(localeFilePath);

      // Check for content folder
      const contentPath = join(nuxt.options.rootDir, "content", localeCode);
      const hasContentFolder = existsSync(contentPath);

      if (!hasLocaleFile) {
        console.warn(
          `[MDD] Locale file not found: ${localeCode}.json - skipping locale "${localeCode}"`
        );
      }

      if (!hasContentFolder) {
        console.warn(
          `[MDD] Content folder not found: content/${localeCode}/ - skipping locale "${localeCode}"`
        );
      }

      return hasLocaleFile && hasContentFolder;
    });

    // Override strategy to prefix
    nuxt.options.i18n = {
      ...nuxt.options.i18n,
      strategy: "prefix",
    };

    // Expose filtered locales
    nuxt.options.runtimeConfig.public.mdd = {
      filteredLocales,
    };

    nuxt.hook("i18n:registerModule", (register) => {
      const langDir = resolve("../i18n/locales");

      const locales = filteredLocales?.map((locale) => {
        return typeof locale === "string"
          ? {
              code: locale,
              name: locale,
              file: `${locale}.json`,
            }
          : {
              code: locale.code,
              name: locale.name || locale.code,
              file: `${locale.code}.json`,
            };
      });

      register({
        langDir,
        locales,
      });
    });
  },
});
