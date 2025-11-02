import path from "node:path"
import fs from "node:fs/promises"
import * as prettier from "prettier"
import { exec } from "node:child_process"

const filename = path.resolve(import.meta.dirname, "../../content/en/guides/1.getting-started/1.index.md")

const fileContent = await fs.readFile(filename, "utf-8")

const formatted = await prettier.format(fileContent, {
  parser: "markdown",
  plugins: [path.resolve(import.meta.dirname, "index.mjs")],
})

// Call "diff" with "delta" format to show only the changes
const command = `diff --unified --color=always <(echo "${fileContent.replace(/"/g, "\\\"")}") <(echo "${formatted.replace(/"/g, "\\\"")}") | delta --side-by-side --width=180`

exec(command, { shell: "/bin/bash" }, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing diff: ${error.message}`)
    return
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`)
    return
  }
  console.log(`Diff between original and formatted content:\n${stdout}`)
})
