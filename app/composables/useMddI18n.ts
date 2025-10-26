import type { LocaleObject } from "@nuxtjs/i18n";

export const useMddI18n = () => {
  const config = useRuntimeConfig().public;

  const { locale, t } = useI18n();
  const filteredLocales =
    (config.mdd as { filteredLocales: LocaleObject<string>[] })
      ?.filteredLocales || [];

  const _switchLocalePath = useSwitchLocalePath();
  const localePath = useLocalePath();

  const localizeLink = <T extends { to?: string }>(link: T) => {
    if (link.to) {
      return {
        ...link,
        to: localePath(link.to),
      };
    }
    return link;
  };

  return {
    locale,
    locales: filteredLocales,
    t,
    localePath,
    localizeLink,
    switchLocalePath: (localeCode: string) =>
      _switchLocalePath(localeCode as Parameters<typeof _switchLocalePath>[0]),
  };
};
