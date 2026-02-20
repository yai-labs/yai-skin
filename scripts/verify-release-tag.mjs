import fs from "node:fs";

const tag = process.env.GIT_TAG;
if (!tag) {
  throw new Error("Missing GIT_TAG environment variable");
}

const version = fs.readFileSync("VERSION", "utf8").trim();
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));

if (!/^v\d+\.\d+\.\d+$/.test(tag)) {
  throw new Error(`Invalid tag format '${tag}'. Expected vX.Y.Z`);
}

const tagVersion = tag.slice(1);
if (tagVersion !== version) {
  throw new Error(`Tag/VERSION mismatch: tag='${tagVersion}', VERSION='${version}'`);
}

if (pkg.version !== version) {
  throw new Error(`package.json/VERSION mismatch: package='${pkg.version}', VERSION='${version}'`);
}

console.log("release tag validation OK");
