import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const indexPath = path.join(root, "index.css");
const raw = fs.readFileSync(indexPath, "utf8");

const imports = raw
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line.startsWith("@import"))
  .map((line) => {
    const m = line.match(/@import\s+"(.+)";/);
    if (!m) {
      throw new Error(`Invalid import syntax: ${line}`);
    }
    return m[1];
  });

const expected = [
  "./base/reset.css",
  "./tokens/colors.semantic.css",
  "./tokens/colors.yai-dna.css",
  "./tokens/spacing.css",
  "./tokens/typography.css",
  "./base/layout.css",
  "./base/topbar.css",
  "./components/buttons.css",
  "./components/cards.css",
  "./components/forms.css",
  "./components/modal.css",
  "./tokens/themes/theme-dark.css",
  "./tokens/themes/theme-yai.css",
  "./base/utilities.css"
];

if (imports.length !== expected.length) {
  throw new Error(`Unexpected number of imports: got ${imports.length}, expected ${expected.length}`);
}

for (let i = 0; i < expected.length; i += 1) {
  if (imports[i] !== expected[i]) {
    throw new Error(`Import order mismatch at position ${i + 1}: got '${imports[i]}', expected '${expected[i]}'`);
  }
}

for (const rel of imports) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) {
    throw new Error(`Missing imported file: ${rel}`);
  }
}

console.log("entrypoint lint OK");
