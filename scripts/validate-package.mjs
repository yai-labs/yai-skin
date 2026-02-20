import fs from "node:fs";

const required = [
  "VERSION",
  "CHANGELOG.md",
  "LICENSE",
  "README.md",
  "docs/architecture.md",
  "docs/release.md",
  "index.css",
  "package.json"
];

for (const file of required) {
  if (!fs.existsSync(file)) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const version = fs.readFileSync("VERSION", "utf8").trim();
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));

if (!/^\d+\.\d+\.\d+$/.test(version)) {
  throw new Error(`Invalid VERSION format: ${version}`);
}

if (pkg.version !== version) {
  throw new Error(`Version mismatch: VERSION='${version}' package.json='${pkg.version}'`);
}

if (pkg.main !== "index.css") {
  throw new Error(`Invalid package main: ${pkg.main}`);
}

console.log("package validation OK");
