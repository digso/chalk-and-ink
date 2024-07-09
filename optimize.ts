import {readFileSync, readdirSync, statSync, writeFileSync} from "node:fs"
import {join} from "node:path"
import {stdout} from "node:process"
import {optimize} from "svgo"

/** Relative path to current working directory at the repo root. */
const iconsFolderPath = "icons"

/** Get all file path inside the given directory path. */
function walkDir(path: string): string[] {
  const files: string[] = []
  for (const file of readdirSync(path)) {
    const filePath = join(path, file)
    if (statSync(filePath).isDirectory()) {
      files.push(...walkDir(filePath))
    } else {
      files.push(filePath)
    }
  }
  return files
}

// Get all SVG files inside specified folder.
const files = walkDir(iconsFolderPath)
const svgFiles: string[] = []
for (const path of files) {
  if (path.endsWith(".svg")) svgFiles.push(path)
}
console.log(
  `\x1b[34mProcessing folder "${iconsFolderPath}"\x1b[0m\x1b[2m:\x1b[0m`,
  `\x1b[32m${svgFiles.length}\x1b[0m`,
  "\x1b[2mSVG files,\x1b[0m",
  `${files.length}\x1b[2m total files\x1b[0m`,
)

// Optimize all SVG files.
for (const file of svgFiles) {
  const message = `\x1b[2mProcessing: ${file}\x1b[0m`
  stdout.write(message)
  const content = readFileSync(file).toString()
  writeFileSync(file, optimize(content).data)
  stdout.cursorTo(0)
  stdout.clearLine(1)
}
console.log("\x1b[1m\x1b[32mOptimization process finished.\x1b[0m")
