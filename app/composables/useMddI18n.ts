import type { LocaleObject } from "@nuxtjs/i18n";

export const useMddI18n = () => {
  const config = useRuntimeConfig().public;

  const { locale, t } = useI18n();
  const filteredLocales =
    (config.mdd as { filteredLocales: LocaleObject<string>[] })
      ?.filteredLocales || [];

  const _switchLocalePath = useSwitchLocalePath();

  return {
    locale,
    locales: filteredLocales,
    t,
    localePath: useLocalePath(),
    switchLocalePath: (localeCode: string) =>
      _switchLocalePath(localeCode as Parameters<typeof _switchLocalePath>[0]),
  };
};
