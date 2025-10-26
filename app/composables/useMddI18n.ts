import type { LocaleObject } from "@nuxtjs/i18n";

export const useMddI18n = () => {
  const config = useRuntimeConfig().public;

  const { locale, t } = useI18n();
  const filteredLocales =
    (
      config.mdd as {
        filteredLocales: LocaleObject<(typeof locale)["value"]>[];
      }
    )?.filteredLocales || [];

  const _switchLocalePath = useSwitchLocalePath();
  const localePath = useLocalePath();

  return {
    locale,
    locales: filteredLocales,
    t,
    localePath,
    switchLocalePath: (localeCode: string) =>
      _switchLocalePath(localeCode as Parameters<typeof _switchLocalePath>[0]),
  };
};
