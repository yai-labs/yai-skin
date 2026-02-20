import { execSync } from "node:child_process";

const output = execSync("npm pack --json", { encoding: "utf8" });
const parsed = JSON.parse(output);
const pack = Array.isArray(parsed) ? parsed[0] : parsed;

if (!pack || !Array.isArray(pack.files)) {
  throw new Error("Unable to read npm pack metadata");
}

const included = new Set(pack.files.map((f) => f.path));
const expected = [
  "index.css",
  "base/reset.css",
  "base/layout.css",
  "components/buttons.css",
  "tokens/colors.semantic.css",
  "tokens/themes/theme-dark.css"
];

for (const file of expected) {
  if (!included.has(file)) {
    throw new Error(`Packed tarball missing required file: ${file}`);
  }
}

console.log("pack smoke OK");
