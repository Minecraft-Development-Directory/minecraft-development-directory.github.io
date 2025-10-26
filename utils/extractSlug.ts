import { withLeadingSlash } from "ufo";

export function extractSlug(slug: string | string[] | undefined): string {
  const url = Array.isArray(slug) ? slug.join("/") : slug || "";
  return withLeadingSlash(url);
}
