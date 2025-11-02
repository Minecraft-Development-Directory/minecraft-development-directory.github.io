import { parseMarkdown, stringifyMarkdown } from "@nuxtjs/mdc/runtime"
import require_markdown from "prettier/plugins/markdown.js"

/** @type {import('prettier').Plugin} */
export default {
  /* languages: [
    {
      name: "Markdown with MDC",
      parsers: ["mdc"],
      extensions: [".md", ".mdc"],
      vscodeLanguageIds: ["mdc", "markdown"],
    },
  ], */
  parsers: {
    markdown: {
      ...require_markdown.parsers.markdown,
      parse: (text) => {
        return parseMarkdown(text, {
          contentHeading: false,
        })
      },
      astFormat: "mdc",
    },
  },
  printers: {
    /** @type {import('prettier').Printer} */
    mdc: {
      print: async (path) => {
        const { body, data } = path.stack[0]
        return stringifyMarkdown(body, data, {
          plugins: {
            remarkStringify: {
              options: {
                resourceLink: true,
              },
            },
          },
        })
      },
    },
  },
}
