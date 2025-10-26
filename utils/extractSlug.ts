import { withLeadingSlash } from "ufo";

export function extractSlug(slug: string | string[] | undefined): string {
  if (Array.isArray(slug)) {
    slug = slug.filter(Boolean);
    slug = slug.join("/");
  }

  if (!slug || slug === "/") {
    return "";
  }

  slug = slug.endsWith("/") ? slug.slice(0, -1) : slug;
  return withLeadingSlash(slug);
}
