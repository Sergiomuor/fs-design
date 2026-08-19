#!/usr/bin/env node
/**
 * fs-design hook admin — toggle the opt-in luz-lint hook for this project.
 *
 * Usage: node hook-admin.mjs <on|off|status>
 *
 * Writes .claude/fs-design.local.json at the project root. The plugin's
 * hooks/hooks.json registers the hook for everyone who installed the plugin,
 * but hook.mjs is dormant unless this per-project toggle (or FS_DESIGN_HOOK=1)
 * turns it on.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

function findProjectRoot(startDir) {
  let dir = resolve(startDir);
  while (true) {
    if (existsSync(join(dir, '.git'))) return dir;
    const parent = dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

const cmd = process.argv[2];
if (!['on', 'off', 'status'].includes(cmd)) {
  console.error('usage: node hook-admin.mjs <on|off|status>');
  process.exit(1);
}

const root = findProjectRoot(process.cwd());
if (!root) {
  console.error('hook-admin: not inside a git project — run from the project you want to configure.');
  process.exit(1);
}

const cfgPath = join(root, '.claude', 'fs-design.local.json');
let cfg = {};
try {
  cfg = JSON.parse(readFileSync(cfgPath, 'utf8'));
} catch { /* fresh config */ }

if (cmd === 'status') {
  const state = process.env.FS_DESIGN_HOOK === '1' || process.env.FS_DESIGN_HOOK === 'on'
    ? 'on (forced by FS_DESIGN_HOOK env)'
    : process.env.FS_DESIGN_HOOK === '0' || process.env.FS_DESIGN_HOOK === 'off'
      ? 'off (forced by FS_DESIGN_HOOK env)'
      : cfg.luzLintHook === 'on' ? 'on' : 'off (default)';
  console.log(`luz-lint hook for ${root}: ${state}`);
  console.log(`config file: ${cfgPath}${existsSync(cfgPath) ? '' : ' (not created yet)'}`);
  process.exit(0);
}

cfg.luzLintHook = cmd;
mkdirSync(dirname(cfgPath), { recursive: true });
writeFileSync(cfgPath, JSON.stringify(cfg, null, 2) + '\n');
console.log(`luz-lint hook: ${cmd} (${cfgPath})`);

// Warn if the toggle file would be committed — it is a personal setting.
const check = spawnSync('git', ['check-ignore', '-q', cfgPath], { cwd: root });
if (check.status !== 0) {
  console.log('note: .claude/fs-design.local.json is not git-ignored in this repo — consider adding it to .gitignore (it is a per-person toggle, not team config).');
}
