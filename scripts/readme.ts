import os from "node:os";
import process from "node:process";
import fs from "node:fs/promises";

const readmeFilename = new URL("../README.md", import.meta.url);
const templateFilename = new URL("./README.tpl.md", import.meta.url);
const placeholder = "<!-- OPERATORS -->";

const template = await fs.readFile(templateFilename, "utf-8");

const operators = [];
const srcDir = new URL("../src/", import.meta.url);
for (const srcElement of await fs.readdir(srcDir)) {
  if (srcElement !== "__tests__" && srcElement !== "index.ts") {
    const operator = srcElement.slice(0, -3);
    const operatorURL = `https://github.com/ksm2/stream-transformers/blob/main/src/__tests__/${operator}.spec.ts`;
    const content = await fs.readFile(new URL(srcElement, srcDir), "utf-8");
    const start = content.indexOf("/**");
    const end = content.indexOf("*/");
    if (start < 0 || end < 0) {
      throw new Error(`"${operator}" operator has no description.`);
    }
    const comment = content.slice(start + 3, end).split(/\r\n \*|[\r\n] \*/g);

    const line = `- [**${operator}**](${operatorURL}) - ${comment[1]}`;
    operators.push(line);
  }
}

const readme = template.replace(placeholder, operators.join(os.EOL));
if (process.argv.includes("--check")) {
  const actual = await fs.readFile(readmeFilename, "utf-8");
  if (actual !== readme) {
    process.stderr.write(`Readme is out of date. Regenerate it with "npm run readme:fix".`);
    process.exitCode = 1;
  }
} else if (process.argv.includes("--write")) {
  await fs.writeFile(readmeFilename, readme);
}
