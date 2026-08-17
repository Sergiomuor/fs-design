#!/usr/bin/env node
/**
 * fs-design PostToolUse hook — opt-in luz-lint on edited UI files.
 *
 * Registered by the plugin's hooks/hooks.json for Edit|MultiEdit|Write, but
 * DORMANT by default: it only acts when the project opts in via
 * `.claude/fs-design.local.json` ({"luzLintHook": "on"}, managed by
 * hook-admin.mjs) or the FS_DESIGN_HOOK=1 environment variable.
 *
 * Non-blocking by design: always exits 0; findings are returned to Claude as
 * additionalContext so they get fixed in the same turn.
 */

import { readFileSync, existsSync } from 'node:fs';
import { dirname, join, extname, resolve } from 'node:path';

const UI_EXTS = new Set(['.tsx', '.jsx', '.ts', '.css', '.mdx']);
const MAX_FINDINGS = 12;

function findProjectRoot(startDir) {
  let dir = resolve(startDir);
  while (true) {
    if (existsSync(join(dir, '.git'))) return dir;
    const parent = dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

function enabled(fileDir) {
  const env = process.env.FS_DESIGN_HOOK;
  if (env === '1' || env === 'on') return true;
  if (env === '0' || env === 'off') return false;
  const root = findProjectRoot(fileDir);
  if (!root) return false;
  try {
    const cfg = JSON.parse(readFileSync(join(root, '.claude', 'fs-design.local.json'), 'utf8'));
    return cfg.luzLintHook === 'on';
  } catch {
    return false;
  }
}

async function main() {
  let input = '';
  try {
    input = readFileSync(0, 'utf8');
  } catch {
    return;
  }

  let payload;
  try {
    payload = JSON.parse(input);
  } catch {
    return;
  }

  const tool = payload.tool_name;
  if (tool !== 'Edit' && tool !== 'Write' && tool !== 'MultiEdit') return;

  const filePath = payload.tool_input?.file_path;
  if (!filePath || !UI_EXTS.has(extname(filePath))) return;
  if (!existsSync(filePath)) return;
  if (!enabled(dirname(filePath))) return;

  const { scanFile } = await import('./luz-lint.mjs');
  const findings = scanFile(filePath);
  if (findings.length === 0) return;

  const errors = findings.filter((f) => f.severity === 'error').length;
  const shown = findings.slice(0, MAX_FINDINGS);
  const body = shown
    .map((f) => `  ${f.line}:${f.col} [${f.severity}] ${f.rule}: \`${f.snippet}\` — ${f.message}${f.hint ? ` Fix: ${f.hint}` : ''}`)
    .join('\n');
  const more = findings.length > shown.length ? `\n  …and ${findings.length - shown.length} more (run luz-lint on the file for the full list).` : '';

  const context = `luz-lint found ${errors} error(s) and ${findings.length - errors} warning(s) in ${filePath}:\n${body}${more}\nFix the errors now using luz tokens/components (see fs-design reference/luz-core.md); warnings need either a fix or a deliberate comment.`;

  console.log(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'PostToolUse',
      additionalContext: context,
    },
  }));
}

main().catch(() => { /* never block the edit */ });
