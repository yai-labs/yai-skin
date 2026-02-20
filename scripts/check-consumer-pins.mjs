#!/usr/bin/env node

import { execSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const root = execSafe("git rev-parse --show-toplevel") || process.cwd();
const lockPath = process.env.CONSUMER_PINS_FILE || resolve(root, "pins/consumers.lock.json");
const strict = process.env.STRICT_CONSUMER_PINS === "1";
const expectedSha =
  process.env.YAI_SKIN_EXPECTED_SHA ||
  execSafe("git rev-parse HEAD", { cwd: root });

if (!/^[0-9a-f]{40}$/i.test(expectedSha || "")) {
  fatal(`invalid expected yai-skin SHA: ${expectedSha || "<empty>"}`);
}

const expectedShort = expectedSha.slice(0, 7);
const doc = JSON.parse(readFileSync(lockPath, "utf8"));
const consumers = Array.isArray(doc.consumers) ? doc.consumers : [];

if (consumers.length === 0) {
  fatal(`no consumers defined in ${lockPath}`);
}

const tmpRoot = mkdtempSync(join(tmpdir(), "yai-skin-pins-"));
const issues = [];

console.log("[CHECK]");
console.log(`  expected_skin_sha : ${expectedSha}`);
console.log(`  strict_mode       : ${strict ? "1" : "0"}`);
console.log(`  lock_file         : ${lockPath}`);

try {
  for (const consumer of consumers) {
    if (consumer.enabled === false) {
      continue;
    }

    const id = String(consumer.id || "").trim();
    const repo = String(consumer.repo || "").trim();
    const branch = String(consumer.branch || "main").trim();
    const submodulePath = String(consumer.submodulePath || "").trim();
    const localPathHint = String(consumer.localPathHint || id || "<consumer-repo>").trim();

    if (!id || !repo || !submodulePath || submodulePath === "TBD") {
      issues.push({
        id: id || "<unknown>",
        reason: "invalid consumer definition (missing repo/submodulePath)",
        repo,
        branch,
        submodulePath,
        localPathHint,
        kind: "invalid"
      });
      continue;
    }

    const headSha = resolveRemoteHead(repo, branch);
    if (!headSha) {
      issues.push({
        id,
        reason: `cannot resolve ${repo} ${branch} HEAD`,
        repo,
        branch,
        submodulePath,
        localPathHint,
        kind: "unreachable"
      });
      continue;
    }

    const work = join(tmpRoot, id.replace(/[^a-zA-Z0-9._-]/g, "_"));
    run(`git init -q ${shellQuote(work)}`);
    run(`git -C ${shellQuote(work)} remote add origin ${shellQuote(repo)}`);

    try {
      run(`git -C ${shellQuote(work)} fetch --depth 1 origin ${shellQuote(headSha)}`);
    } catch {
      issues.push({
        id,
        reason: `cannot fetch ${repo} @ ${headSha}`,
        repo,
        branch,
        submodulePath,
        localPathHint,
        kind: "unreachable"
      });
      continue;
    }

    const lsTree = execSafe(`git -C ${shellQuote(work)} ls-tree -d ${shellQuote(headSha)} ${shellQuote(submodulePath)}`);
    const pinSha = parseGitlinkSha(lsTree);

    if (!pinSha) {
      issues.push({
        id,
        reason: `missing gitlink at ${submodulePath} in ${repo}@${branch}`,
        repo,
        branch,
        submodulePath,
        localPathHint,
        kind: "missing_gitlink"
      });
      continue;
    }

    const status = pinSha === expectedSha ? "OK" : "MISMATCH";
    console.log(`  ${id.padEnd(14)} : ${status} pin=${pinSha.slice(0, 12)} branch=${branch}`);

    if (status === "MISMATCH") {
      issues.push({
        id,
        reason: `pin mismatch (expected ${expectedSha.slice(0, 12)}, found ${pinSha.slice(0, 12)})`,
        repo,
        branch,
        submodulePath,
        localPathHint,
        foundPin: pinSha,
        kind: "mismatch"
      });
    }
  }
} finally {
  rmSync(tmpRoot, { recursive: true, force: true });
}

if (issues.length === 0) {
  console.log("\n[RESULT] PASS");
  console.log("[REASON] all enabled consumers are aligned to expected yai-skin pin");
  process.exit(0);
}

printIssues(
  issues,
  expectedSha,
  expectedShort,
  strict,
  String(doc.skinRepository || "https://github.com/yai-labs/yai-skin.git")
);
if (strict) {
  process.exit(2);
}
process.exit(0);

function printIssues(issues, expected, expectedShortSha, strictMode, skinRepoUrl) {
  console.log("\n[RESULT] " + (strictMode ? "FAIL" : "WARN"));
  console.log("[REASON] one or more consumer pins are not aligned");
  for (const issue of issues) {
    console.log(`- ${issue.id}: ${issue.reason}`);
  }

  console.log("\n[FIX PLAN]");
  for (const issue of issues) {
    if (!issue.repo || !issue.submodulePath || !issue.localPathHint) {
      continue;
    }
    console.log(`\n# ${issue.id}`);
    console.log(`cd <YAI_WORKSPACE>/${issue.localPathHint}`);
    console.log("git checkout main && git pull --rebase");
    if (issue.kind === "missing_gitlink") {
      console.log(`git submodule add ${skinRepoUrl} ${issue.submodulePath}`);
    }
    console.log(`git -C ${issue.submodulePath} fetch origin`);
    console.log(`git -C ${issue.submodulePath} checkout ${expected}`);
    console.log(`git add ${issue.submodulePath}`);
    console.log(`git commit -m \"chore(skin): bump yai-skin pin to ${expectedShortSha}\"`);
    console.log(`git push -u origin chore/bump-skin-pin-${expectedShortSha}`);
  }

  console.log("\n[MACHINE]");
  console.log(`result=${strictMode ? "FAIL" : "WARN"}`);
  console.log("reason=consumer pins not aligned");
  console.log(`strict_mode=${strictMode ? "1" : "0"}`);
  console.log(`expected_skin_sha=${expected}`);
}

function resolveRemoteHead(repo, branch) {
  const out = execSafe(`git ls-remote ${shellQuote(repo)} refs/heads/${shellQuote(branch)}`);
  if (!out) {
    return "";
  }
  return out.split(/\s+/)[0] || "";
}

function parseGitlinkSha(text) {
  if (!text) {
    return "";
  }
  const m = text.trim().match(/^\d+\s+commit\s+([0-9a-f]{40})\s+/i);
  return m ? m[1] : "";
}

function run(cmd) {
  execSync(cmd, { stdio: "ignore" });
}

function execSafe(cmd, options = {}) {
  try {
    return execSync(cmd, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], ...options }).trim();
  } catch {
    return "";
  }
}

function shellQuote(v) {
  return `'${String(v).replace(/'/g, `'"'"'`)}'`;
}

function fatal(message) {
  console.error(`[FAIL] ${message}`);
  process.exit(3);
}
