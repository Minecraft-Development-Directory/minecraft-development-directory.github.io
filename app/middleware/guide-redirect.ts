export default defineNuxtRouteMiddleware(async () => {
  // When navigating to /guides without a slug, redirect to the first content page available
  // first in the original language, then in the fallback language (English)

  const nuxtApp = useNuxtApp()
  const i18n = nuxtApp.$i18n
  const locale = i18n.locale.value
  const fallbackLocale = i18n.fallbackLocale.value

  // Get the first guide in the current locale
  const getFirstGuidePath = async (lang: typeof locale) => {
    const doc = await queryCollection(`guides_${lang}`).where("id", "NOT LIKE", "%.yml").first()
    return doc ? `/${locale}${doc.path}` : null
  }

  let firstGuidePath = await getFirstGuidePath(locale)
  if (firstGuidePath) {
    return navigateTo(firstGuidePath)
  }

  if (typeof fallbackLocale === "string" && locale !== fallbackLocale) {
    firstGuidePath = await getFirstGuidePath(fallbackLocale)
    if (firstGuidePath) {
      return navigateTo(firstGuidePath)
    }
  }
  // No guide found, stay on the page (will show a "no content" message)
})
