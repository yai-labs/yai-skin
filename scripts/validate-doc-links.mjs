import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const docsDir = path.join(root, "docs");
if (!fs.existsSync(docsDir)) {
  console.log("No docs directory, skipping");
  process.exit(0);
}

const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name.endsWith(".md")) files.push(full);
  }
}
walk(docsDir);

const errors = [];
const linkRe = /\[[^\]]+\]\(([^)]+)\)/g;

for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  for (const m of text.matchAll(linkRe)) {
    const link = m[1];
    if (link.startsWith("http://") || link.startsWith("https://") || link.startsWith("mailto:")) continue;
    if (link.startsWith("#")) continue;
    const target = link.split("#")[0];
    if (!target) continue;
    const resolved = path.resolve(path.dirname(file), target);
    if (!fs.existsSync(resolved)) {
      errors.push(`${path.relative(root, file)} -> missing link target: ${link}`);
    }
  }
}

if (errors.length) {
  console.error("Docs link validation errors:");
  for (const e of errors) console.error(`- ${e}`);
  process.exit(1);
}

console.log("docs links OK");
