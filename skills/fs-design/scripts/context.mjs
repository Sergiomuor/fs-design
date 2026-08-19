#!/usr/bin/env node
/**
 * fs-design context loader — run once per session before design work.
 *
 * Locates the project root, reports which context files exist (PRODUCT.md /
 * DESIGN.md at root, or the plugin snapshots as fallback), verifies sentinel
 * tokens against the live packages/luz/src/styles.css (drift detection), and
 * classifies an optional --target path into a surface mode.
 *
 * Usage: node context.mjs [--target <path>] [--plugin-root <dir>]
 *
 * Output is a directive block the fs-design skill reads. Deterministic, no
 * network, safe to run anywhere.
 */

import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
// scripts/ → fs-design/ (skill root); plugin root is two levels above that.
const SKILL_ROOT = resolve(SCRIPT_DIR, '..');

// Sentinel tokens: exact declarations expected in packages/luz/src/styles.css.
// Verified against origin/main on 2026-08-17. A mismatch means the plugin's
// references (and possibly DESIGN.md) are stale relative to production.
const SENTINELS = [
  ['--color-product-purple-700', '#4c2fff'],
  ['--color-base-gray-border', '#e2e2e3'],
  ['--color-product-mitigation-700', '#ff005c'],
  ['--color-product-advanced-700', '#00adb0'],
  ['--color-product-data-900', '#bf002e'],
  ['--spacing-5', '30px'],
  ['--spacing-7', '50px'],
  ['--spacing-ds-10', '120px'],
  ['--radius-button', '4px'],
  ['--breakpoint-xl', '1440px'],
];

function findProjectRoot(startDir) {
  let dir = resolve(startDir);
  while (true) {
    if (existsSync(join(dir, '.git'))) return dir;
    const parent = dirname(dir);
    if (parent === dir) return resolve(startDir);
    dir = parent;
  }
}

function classifyTarget(target, root) {
  const rel = resolve(root, target).replace(root + '/', '').replace(/\\/g, '/');
  if (/packages\/luz\//.test(rel)) {
    return {
      surface: 'luz-component',
      mode: 'system',
      note: 'Luz component work — load reference/components.md; ship complete (full variant set, all states, a story per variant); Figma parity or stop-and-flag.',
    };
  }
  if (/apps\/storybook\//.test(rel)) {
    return {
      surface: 'storybook',
      mode: 'Read',
      note: 'Storybook docs surface — MDX prose gets NO preview decorators (bring your own providers); runtime-composed classes may need a safelist.',
    };
  }
  if (/\b(?:reports?|pdf|print)\b/i.test(rel)) {
    return {
      surface: 'report',
      mode: 'Report',
      note: 'Report/print surface — ReportModeContext/useReportMode; currency via CurrencySnapshot; print-grade typography; PDF colours are pinned to chart colours by an alignment test.',
    };
  }
  if (/apps\/web\/.*admin/.test(rel)) {
    return {
      surface: 'app-admin',
      mode: 'Operate',
      note: 'Admin surface — container-admin (1200px); Operate mode: scanability and task completion first.',
    };
  }
  if (/apps\/web\//.test(rel)) {
    return {
      surface: 'app',
      mode: 'Operate/Oversee (confirm from the page intent)',
      note: 'App surface — dashboards and portfolio views are Oversee (Petra); workflows and forms are Operate (Pete); methodology drill-downs are Interrogate (Esther).',
    };
  }
  return { surface: 'unknown', mode: 'ask', note: 'Could not classify — confirm the surface mode with the user.' };
}

function main() {
  const argv = process.argv.slice(2);
  const targetIdx = argv.indexOf('--target');
  const target = targetIdx !== -1 ? argv[targetIdx + 1] : null;

  const cwd = process.cwd();
  const root = findProjectRoot(cwd);
  const stylesPath = join(root, 'packages/luz/src/styles.css');
  const isPlatform = existsSync(stylesPath);

  const lines = [];
  lines.push('FS-DESIGN CONTEXT');
  lines.push(`project-root: ${root}`);
  lines.push(`platform-repo: ${isPlatform ? 'yes' : 'no'}`);

  // Context files: prefer project-root copies, fall back to plugin snapshots.
  const rootDesign = join(root, 'DESIGN.md');
  const rootProduct = join(root, 'PRODUCT.md');
  lines.push(existsSync(rootDesign)
    ? `DESIGN: ${rootDesign} (project copy — read its frontmatter for the full token table)`
    : `DESIGN: ${join(SKILL_ROOT, 'reference/DESIGN.snapshot.md')} (plugin snapshot — no DESIGN.md at project root; offer /fs-design init)`);
  lines.push(existsSync(rootProduct)
    ? `PRODUCT: ${rootProduct} (project copy)`
    : `PRODUCT: ${join(SKILL_ROOT, 'reference/product.md')} (plugin snapshot — canonical personas and principles)`);

  // Live ground truth + drift check.
  if (isPlatform) {
    lines.push(`ground-truth: ${stylesPath}`);
    try {
      const css = readFileSync(stylesPath, 'utf8');
      const drift = [];
      const missing = [];
      for (const [name, expected] of SENTINELS) {
        const m = css.match(new RegExp(`${name}\\s*:\\s*([^;]+);`));
        if (!m) missing.push(name);
        else if (m[1].trim().toLowerCase() !== expected.toLowerCase()) drift.push(`${name} = ${m[1].trim()} (plugin expects ${expected})`);
      }
      if (drift.length === 0 && missing.length === 0) {
        lines.push('token-drift: none — plugin references match production styles.css');
      } else {
        for (const d of drift) lines.push(`DRIFT: ${d}`);
        for (const s of missing) lines.push(`SENTINEL-MISSING: ${s} (token renamed or removed?)`);
        lines.push('drift-directive: report this to the user and suggest /fs-design doctor; do NOT repair as a side effect of a design task.');
      }
    } catch {
      lines.push('token-drift: unreadable styles.css — skipping check');
    }
    const luzRef = join(root, 'apps/storybook/public/landing/luz-reference.md');
    if (existsSync(luzRef)) lines.push(`deep-reference: ${luzRef} (Figma-audited token + component inventory; load sections on demand, not whole)`);
    if (existsSync(join(root, 'apps/storybook'))) lines.push('storybook: pnpm --filter @repo/storybook dev → http://localhost:6006 (published: https://luz.fairsupply.io/)');
  } else {
    lines.push('ground-truth: not in the platform repo — plugin snapshots are authoritative here; production truth lives on platform main.');
  }

  // Hook status.
  const localCfg = join(root, '.claude', 'fs-design.local.json');
  let hookState = 'off (default)';
  try {
    if (existsSync(localCfg)) {
      const cfg = JSON.parse(readFileSync(localCfg, 'utf8'));
      if (cfg.luzLintHook === 'on') hookState = 'on';
    }
  } catch { /* unreadable config = default off */ }
  if (process.env.FS_DESIGN_HOOK === '1' || process.env.FS_DESIGN_HOOK === 'on') hookState = 'on (env)';
  lines.push(`luz-lint-hook: ${hookState}${hookState.startsWith('on') ? ' — the hook lints your edits; act on its findings instead of re-auditing' : ' — run luz-lint manually after edits, or enable with: node ' + join(SCRIPT_DIR, 'hook-admin.mjs') + ' on'}`);

  if (target) {
    const t = classifyTarget(target, root);
    lines.push(`target: ${target}`);
    lines.push(`target-surface: ${t.surface} · mode: ${t.mode}`);
    lines.push(`target-note: ${t.note}`);
  }

  // Learnings (feedback loop): shipped rules + per-user overlay. Active entries
  // end their header line with the word "active" — see reference/learnings.md.
  const countActive = (path) => {
    try { return (readFileSync(path, 'utf8').match(/^## L\d+ .*· active\s*$/gm) || []).length; }
    catch { return 0; }
  };
  const nShipped = countActive(join(SKILL_ROOT, 'reference/learnings.md'));
  const personalPath = join(homedir(), '.claude', 'fs-design.learnings.md');
  const nPersonal = existsSync(personalPath) ? countActive(personalPath) : 0;
  lines.push(nShipped > 0
    ? `learnings: ${nShipped} active rule${nShipped === 1 ? '' : 's'} — load reference/learnings.md with the other references; rules override playbook defaults.`
    : 'learnings: none active — the feedback loop (reference/feedback.md) records them at the end of each run.');
  if (nPersonal > 0) lines.push(`learnings-personal: ${personalPath} (${nPersonal} active — load after shipped learnings; personal wins on conflict).`);

  lines.push('feedback-loop: end design commands with the numbered feedback offer (reference/feedback.md); skip for maintenance commands.');
  lines.push('directives: load reference/product.md + reference/luz-core.md now; load reference/craft-floor.md immediately before editing UI; run luz-lint on changed files after edits.');
  console.log(lines.join('\n'));
}

main();
