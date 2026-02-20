#!/usr/bin/env node

import { execSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const args = new Set(process.argv.slice(2));
const shouldApply = args.has("--apply");

const repoRoot = process.cwd();
const templatePath = resolve(repoRoot, ".github/PULL_REQUEST_TEMPLATE/default.md");
const outputPath = resolve(repoRoot, ".pr/PR_BODY.md");

function readTemplate(path) {
  return readFileSync(path, "utf8");
}

function safeGit(command) {
  try {
    return execSync(command, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return "";
  }
}

const baseSha = safeGit("git rev-parse origin/main") || safeGit("git rev-parse HEAD");
const headSha = safeGit("git rev-parse HEAD");

let content = readTemplate(templatePath);
content = content.replace(/<40-char-sha>/g, baseSha || "<40-char-sha>");
content = content.replace(/<head-sha>/g, headSha || "<head-sha>");

mkdirSync(resolve(repoRoot, ".pr"), { recursive: true });
writeFileSync(outputPath, `${content.trimEnd()}\n`, "utf8");

console.log(`Generated ${outputPath}`);

if (shouldApply) {
  execSync("gh pr edit --body-file .pr/PR_BODY.md", { stdio: "inherit" });
}
