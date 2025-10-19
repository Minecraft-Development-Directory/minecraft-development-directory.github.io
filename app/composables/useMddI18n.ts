import type { LocaleObject } from "@nuxtjs/i18n";

export const useMddI18n = () => {
  const config = useRuntimeConfig().public;

  const { locale, t } = useI18n();
  const filteredLocales =
    (config.mdd as { filteredLocales: LocaleObject<string>[] })
      ?.filteredLocales || [];

  return {
    locale,
    locales: filteredLocales,
    t,
    localePath: useLocalePath(),
    switchLocalePath: useSwitchLocalePath(),
  };
};
