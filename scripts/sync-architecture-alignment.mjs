import fs from "node:fs";

const write = process.argv.includes("--write");
const check = process.argv.includes("--check");

const raw = fs.readFileSync("index.css", "utf8");
const imports = raw
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line.startsWith("@import"))
  .map((line) => {
    const m = line.match(/@import\s+"(.+)";/);
    return m ? m[1] : null;
  })
  .filter(Boolean);

const data = {
  version: 1,
  generatedAt: new Date().toISOString(),
  entrypoint: "index.css",
  imports,
  policy: ["reset", "tokens", "base", "components", "themes", "utilities"]
};

const out = "docs/_generated/architecture-alignment.v1.json";

if (write) {
  fs.mkdirSync("docs/_generated", { recursive: true });
  fs.writeFileSync(out, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  console.log(`wrote ${out}`);
  process.exit(0);
}

if (check) {
  if (!fs.existsSync(out)) {
    throw new Error(`Missing ${out}. Run with --write.`);
  }
  const current = JSON.parse(fs.readFileSync(out, "utf8"));
  if (!Array.isArray(current.imports)) {
    throw new Error(`${out} is invalid`);
  }
  const same = JSON.stringify(current.imports) === JSON.stringify(imports);
  if (!same) {
    throw new Error(`${out} is stale. Run sync script with --write.`);
  }
  console.log("architecture alignment OK");
}
