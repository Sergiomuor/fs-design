#!/usr/bin/env node
/**
 * luz-lint — FS-Luz vocabulary enforcement for Fair Supply UI code.
 *
 * Scans .tsx/.jsx/.ts/.js/.css/.mdx files for violations of the Luz design
 * system rules (repo-root DESIGN.md; ground truth packages/luz/src/styles.css):
 * hex/rgb literals, stock Tailwind palette + type classes, spacing utilities
 * >= 10, fractional spacing, arbitrary values, stock radius/shadow, dark:
 * variants, gradients, legacy @repo/luz exports, purple-as-decoration.
 *
 * Usage:
 *   node luz-lint.mjs [files...] [--diff] [--staged] [--json] [--quiet] [--root <dir>]
 *
 *   files...   explicit files to scan
 *   --diff     scan files changed vs HEAD plus untracked files (default when no files given)
 *   --staged   scan staged files only
 *   --json     machine-readable output
 *   --quiet    print errors only (warnings still counted)
 *   --root     project root for git commands (default: cwd)
 *
 * Escapes: a line containing `luz-lint-ignore` suppresses that line AND the
 * next one (JSX comments sit above their target); a file containing
 * `luz-lint-disable` in its first 10 lines is skipped entirely. Findings in
 * *.test.* / *.spec.* files are downgraded to warnings.
 *
 * Exit codes: 1 if any error-severity finding, else 0.
 */

import { readFileSync, existsSync, statSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve, extname, basename } from 'node:path';
import { pathToFileURL } from 'node:url';

// ─── Token knowledge (mirrors DESIGN.md frontmatter / styles.css) ────────────

/** hex (lowercase, 6-char) → luz token name, for fix hints */
export const HEX_TO_TOKEN = {
  '#ffffff': 'white / base-white',
  '#000000': 'base-black',
  '#404040': 'base-black-600',
  '#222126': 'base-black-800',
  '#353a3c': 'base-gray-dark (text-dark)',
  '#585b5d': 'base-gray-medium (text-medium)',
  '#656e72': 'base-gray-light (text-light)',
  '#9eacb2': 'base-gray-disabled',
  '#bbbbbb': 'base-gray-input',
  '#e2e2e3': 'base-gray-border (surface-border)',
  '#fbfbfc': 'base-gray-background (surface-background)',
  '#fcfaff': 'base-gray-active',
  '#eeeeee': 'base-gray-other (muted)',
  '#00ace1': 'brand-blue-500',
  '#00799e': 'brand-blue-700',
  '#004b62': 'brand-blue-900',
  '#e5f7fc': 'branded-biodiversity-background',
  '#eef8f1': 'brand-green-100',
  '#51af82': 'brand-green-500',
  '#286e37': 'brand-green-700',
  '#1f3312': 'brand-green-900',
  '#f8f2ff': 'brand-orchid-100',
  '#9e2eb2': 'brand-orchid-500',
  '#6c409f': 'brand-orchid-700',
  '#310761': 'brand-orchid-900',
  '#fcf6f7': 'product-pink-100',
  '#fbc6da': 'product-pink-500',
  '#ad468c': 'product-pink-700',
  '#7e1b5e': 'product-pink-900',
  '#fbf8f4': 'product-meadow-100',
  '#cccc91': 'product-meadow-500',
  '#6d5534': 'product-meadow-700',
  '#28121a': 'product-meadow-900',
  '#f2f6ff': 'product-blue-100',
  '#416a9d': 'product-blue-500',
  '#354a85': 'product-blue-700',
  '#22216c': 'product-blue-900',
  '#f2f2ff': 'product-purple-100',
  '#bdc2f2': 'product-purple-500',
  '#8082ff': 'product-purple-accent',
  '#4c2fff': 'product-purple-700 (focus/selection only)',
  '#301ab7': 'product-purple-900',
  '#fff7f9': 'product-red-100',
  '#c75e7e': 'product-red-400',
  '#d90034': 'product-red-500',
  '#b2002b': 'product-red-700',
  '#73001c': 'product-red-900 / product-mitigation-900',
  '#faf1ec': 'product-orange-100',
  '#fa5c03': 'product-orange-500',
  '#b45018': 'product-orange-700',
  '#551f00': 'product-orange-900',
  '#edf7f4': 'product-green-100',
  '#06d18b': 'product-green-500',
  '#00754d': 'product-green-700',
  '#002a1b': 'product-green-900',
  '#fffbeb': 'product-yellow-100',
  '#fecb00': 'product-yellow-500',
  '#c9a000': 'product-yellow-700',
  '#7a6100': 'product-yellow-900',
  '#bf002e': 'product-data-900',
  '#fff7fa': 'product-mitigation-300',
  '#ff005c': 'product-mitigation-700',
  '#ebf1fc': 'product-recommendation-300',
  '#3c76e0': 'product-recommendation-700',
  '#002872': 'product-recommendation-900',
  '#f2fbfd': 'brand-blue-100 / product-advanced-300',
  '#00adb0': 'product-advanced-700',
  '#094848': 'product-advanced-900',
};

/** known drift literals from old chart/icon code → what to do instead */
const DRIFT_HINTS = {
  '#6b7280': 'stock gray-500 drift — nearest luz: base-gray-light #656e72',
  '#d1d5db': 'stock gray-300 drift — nearest luz: base-gray-border #e2e2e3',
  '#9333ea': 'brand-orchid-accent — marked legacy, do not reuse',
};

const LEGACY_LUZ_EXPORTS = new Set([
  'Menu', 'MenuTrigger', 'MenuContent', 'MenuItem', 'MenuCheckboxItem',
  'MenuLabel', 'MenuSeparator', 'AlertTitle', 'AlertDescription',
  'SidebarNavLink', 'LayoutPage', 'ENGAGEMENT_STATUS_COLORS',
  'boxStyles', 'boxSpacingStyles', 'borderVariants', 'gapVariants',
  'marginVariants', 'paddingVariants', 'radiusVariants', 'shadowVariants',
  'alertStyles', 'dialogStyles', 'progressBarStyles', 'shouldHideOnMobile',
  'arrayFilter', 'dateRangeFilter', 'rangeFilter', 'multiSelectFilter',
  'createBadgeColumn', 'createBooleanBadgeColumn', 'tableToCsv',
  'escapeCsvValue', 'clearFilter', 'clearAllFilters', 'getActiveFilters',
  'hasActiveFilters', 'useFilterToolbar', 'CHART_BRAND_COLORS',
  'CHART_QUADRANT_COLORS', 'CHART_SCOPE_COLORS',
]);

// Stock Tailwind palette families that `--color-*: initial` wipes.
// Luz families are prefixed (base-, brand-, product-) so they never match.
const STOCK_FAMILIES =
  '(?:slate|zinc|neutral|stone|amber|lime|emerald|teal|cyan|sky|indigo|violet|fuchsia|rose|gray|grey|red|orange|yellow|green|blue|purple|pink)';
const COLOR_UTILS =
  '(?:bg|text|border|fill|stroke|ring|outline|divide|decoration|accent|caret|shadow|from|via|to)';

const SPACING_UTILS =
  '(?:p|px|py|ps|pe|pt|pr|pb|pl|m|mx|my|ms|me|mt|mr|mb|ml|gap|gap-x|gap-y|space-x|space-y|inset|inset-x|inset-y|top|right|bottom|left)';

// ─── Rules ───────────────────────────────────────────────────────────────────
// Each rule: { id, severity, re (per line, global), message, hint(match)? , skipIf(line)? }

const RULES = [
  {
    id: 'hex-literal',
    severity: 'error',
    re: /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})(?![0-9a-fA-F])/g,
    skipIf: (line, m) => {
      const before = line.slice(0, m.index);
      // anchors / svg internal references, not colours
      return /(?:href=["']|to=["']|url\(|aria-|data-testid=["'][^"']*)$/.test(before);
    },
    message: 'hardcoded hex colour',
    hint: (m) => {
      const norm = normalizeHex(m[0]);
      if (DRIFT_HINTS[norm]) return DRIFT_HINTS[norm];
      if (HEX_TO_TOKEN[norm]) return `this is luz token ${HEX_TO_TOKEN[norm]} — use the token class/prop`;
      return 'no luz token has this value — question the design or propose a token; never inline it';
    },
  },
  {
    id: 'rgb-literal',
    severity: 'error',
    re: /\b(?:rgba?|hsla?|hwb|oklch|oklab|lab|lch)\(/g,
    message: 'hardcoded colour function (rgb/hsl/oklch/hwb/lab)',
    hint: () => 'use a luz token; the only rgba values in the system are the stroke-shadow halos, already tokenised',
  },
  {
    id: 'stock-palette',
    severity: 'error',
    re: new RegExp(`(?<![\\w-])${COLOR_UTILS}-${STOCK_FAMILIES}-(?:50|[1-9]50|[1-9]00)(?![\\w-])`, 'g'),
    message: 'stock Tailwind palette class — `--color-*: initial` wipes these; it resolves to nothing',
    hint: () => 'use a luz colour token (base-*, brand-*, product-*, or a semantic alias)',
  },
  {
    id: 'stock-black',
    severity: 'error',
    re: /(?<![\w-])(?:bg|text|border|fill|stroke)-black(?![\w-])/g,
    message: 'stock `*-black` class — luz defines base-black / text-black tokens, not `black`',
    hint: (m) => m[0].startsWith('text-')
      ? 'use text-text-black (semantic) or text-base-black'
      : 'use bg-base-black / border-base-black',
  },
  {
    id: 'raw-type-class',
    severity: 'error',
    re: /(?<![\w-])text-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)(?![\w-])/g,
    message: 'raw Tailwind type class — same size, wrong line-height; breaks the 10px grid',
    hint: () => 'pick a composite role: text-body-* / text-heading-* / text-data-* (e.g. text-sm ≈ text-body-sm but 13/24)',
  },
  {
    id: 'phantom-font',
    severity: 'error',
    re: /(?<![\w-])font-twk(?![\w-])/g,
    message: '`font-twk` does not exist — it silently falls back to the system font',
    hint: () => 'use font-heading (TWK Lausanne) or a composite text-heading-*/text-data-* role',
  },
  {
    id: 'stock-font',
    severity: 'warn',
    re: /(?<![\w-])font-(?:sans|serif)(?![\w-])/g,
    message: 'stock font family class',
    hint: () => 'luz faces are font-heading (TWK Lausanne), font-body (Inter), font-mono (Roboto Mono)',
  },
  {
    id: 'raw-leading',
    severity: 'warn',
    re: /(?<![\w-])leading-(?:none|tight|snug|normal|relaxed|loose|\d+)(?![\w-])/g,
    message: 'raw line-height utility — luz line-heights ride the 10px grid via role classes',
    hint: () => 'prefer a composite role, or leading-body-* / leading-heading-* to mix rhythms deliberately',
  },
  {
    id: 'spacing-overflow',
    severity: 'error',
    re: new RegExp(`(?<![\\w-])-?${SPACING_UTILS}-(?:1[0-9]|[2-9]\\d|\\d{3,})(?![\\w.\\-/%])`, 'g'),
    message: 'numeric spacing utility ≥ 10 — luz names steps 10–12 as ds-10/11/12, so this falls back to the stock scale (p-10 = 40px, not 120px)',
    hint: () => 'use a Box prop (p={10} → var(--spacing-ds-10)) or a *-ds-* utility; if you meant 40px, that is step 6 (p-6)',
  },
  {
    id: 'spacing-fractional',
    severity: 'error',
    re: new RegExp(`(?<![\\w-])-?${SPACING_UTILS}-(?:0\\.5|1\\.5|2\\.5|3\\.5)(?![\\w-])`, 'g'),
    message: 'fractional spacing utility — off the 5px scale',
    hint: () => 'snap to the scale: 1=5px 2=10px 3=15px 4=20px; gap-field (6px) is the one sanctioned off-scale value',
  },
  {
    id: 'size-overflow',
    severity: 'warn',
    re: /(?<![\w-])-?(?:w|h|size|min-w|min-h|max-w|max-h)-(?:1[0-9]|[2-9]\d|\d{3,})(?![\w.\-/%])/g,
    message: 'numeric size utility ≥ 10 rides the stock scale while 1–9 ride the luz 5px scale — mixed scales in one file',
    hint: () => 'prefer a --size-* token, a container preset, or an explicit deliberate value with a comment',
  },
  {
    id: 'arbitrary-value',
    severity: 'warn',
    re: /(?<![\w-])(?:text|leading|tracking|p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|gap-x|gap-y|w|h|size|min-w|max-w|min-h|max-h|top|right|bottom|left|inset|rounded|border|shadow|bg|basis|z)-\[[^\]]+\]/g,
    message: 'arbitrary value — a second styling vocabulary',
    hint: () => 'if the value exists in styles.css use its utility; if not, it is either a token to add or a deliberate bespoke moment that needs a comment',
  },
  {
    id: 'stock-radius',
    severity: 'warn',
    re: /(?<![\w-])rounded(?:-(?:xs|sm|md|lg|xl|2xl|3xl|4xl))?(?![\w-])/g,
    message: 'stock radius class — off the luz radius vocabulary',
    hint: () => 'luz radii: rounded-input/button (4px), rounded-xsmall (2px), rounded-1/2/3 (5/10/20px), rounded-pill (10px), rounded-full for true capsules',
  },
  {
    id: 'stock-shadow',
    severity: 'warn',
    re: /(?<![\w-])shadow(?:-(?:2xs|xs|sm|md|lg|xl|2xl|inner))?(?![\w-])/g,
    message: 'stock shadow class — off the luz elevation vocabulary (and depth should be borders first)',
    hint: () => 'luz shadows: shadow-subtle, shadow-light (bordered lift), shadow-heavy (overlays), shadow-focus; prefer a 1px surface-border hairline',
  },
  {
    id: 'dark-variant',
    severity: 'error',
    re: /(?<![\w-])dark:/g,
    message: '`dark:` variant — luz has one light theme; dark surfaces are components, not themes',
    hint: () => 'build dark chrome from base-black / base-black-800 tokens inside the component',
  },
  {
    id: 'gradient',
    severity: 'error',
    re: /(?<![\w-])bg-(?:(?:gradient|linear)-to-(?:t|tr|r|br|b|bl|l|tl)|linear-\d+|radial|conic)(?![\w])/g,
    message: 'gradient — gradients do not exist in Luz',
    hint: () => 'flat token fills only; emphasis comes from hierarchy, space, and black ink',
  },
  {
    id: 'glassmorphism',
    severity: 'warn',
    re: /(?<![\w-])backdrop-blur(?:-[\w]+)?(?![\w-])/g,
    message: 'backdrop blur — glassmorphism is off-brand for Luz',
    hint: () => 'use a solid surface (base-white / surface-background) with a hairline border',
  },
  {
    id: 'purple-decoration',
    severity: 'warn',
    re: /(?<![\w-])(?:bg|text|border)-product-purple-700(?![\w-])/g,
    skipIf: (line) => /focus|select|ring|active|tier|chart|series|checked/i.test(line),
    message: 'product-purple-700 outside an apparent focus/selection context',
    hint: () => 'purple means focus, selection, or a data series (tiers/choropleth) — never decoration; if this is one of those, add context or a luz-lint-ignore comment',
  },
  {
    id: 'currency-suffix',
    severity: 'warn',
    re: /\(\s*(?:USD|AUD|EUR|GBP|NZD|CAD|JPY|CNY)\s*\)/g,
    message: 'appended currency code — the symbol convention already carries it',
    hint: () => 'render through formatCurrency (live: useCurrency(); reports: CurrencySnapshot) and drop the suffix',
  },
];

// ─── File-level rules ────────────────────────────────────────────────────────

function fileLevelFindings(content) {
  const findings = [];

  // legacy @repo/luz imports
  const importRe = /import\s*(?:type\s*)?\{([^}]*)\}\s*from\s*['"]@repo\/luz['"]/g;
  let m;
  while ((m = importRe.exec(content)) !== null) {
    const names = m[1].split(',').map((s) => s.trim().split(/\s+as\s+/)[0].trim()).filter(Boolean);
    for (const name of names) {
      if (LEGACY_LUZ_EXPORTS.has(name)) {
        findings.push({
          line: lineOf(content, m.index),
          col: 1,
          rule: 'legacy-luz-export',
          severity: 'error',
          snippet: name,
          message: `\`${name}\` is a legacy/internal @repo/luz export — do not use in new work`,
          hint: legacyHint(name),
        });
      }
    }
  }

  // toSentenceCase from the main @repo/core barrel (pulls server-only code)
  const coreRe = /import\s*(?:type\s*)?\{([^}]*)\}\s*from\s*['"]@repo\/core['"]/g;
  while ((m = coreRe.exec(content)) !== null) {
    if (/\btoSentenceCase\b/.test(m[1])) {
      findings.push({
        line: lineOf(content, m.index),
        col: 1,
        rule: 'core-barrel-import',
        severity: 'error',
        snippet: 'toSentenceCase',
        message: 'toSentenceCase imported from the @repo/core main barrel — that barrel pulls server-only code',
        hint: () => "import from '@repo/core/domain/utils/string-utils' (or re-exported via @repo/luz lib)",
      });
    }
  }

  return findings;
}

function legacyHint(name) {
  if (name.startsWith('Menu')) return 'use Dropdown or HeaderMenu';
  if (name === 'AlertTitle' || name === 'AlertDescription') return 'Alert renders its own title and body';
  if (name === 'LayoutPage') return 'compose LayoutContainer + LayoutHeader + Region';
  if (name === 'ENGAGEMENT_STATUS_COLORS') return 'use ENGAGEMENT_STATUS_LABELS / ENGAGEMENT_STATUS_ORDER with luz tokens';
  if (/Styles|Variants|shouldHideOnMobile/.test(name)) return 'leaked style internal — style via component props or your own tv() file';
  return 'see the legacy list in DESIGN.md §7 for the supported equivalent';
}

// ─── Scanner ─────────────────────────────────────────────────────────────────

const SCAN_EXTS = new Set(['.tsx', '.jsx', '.ts', '.js', '.mjs', '.css', '.mdx']);
const SKIP_PATH_RE = /(?:^|\/)(?:node_modules|\.next|\.turbo|dist|build|coverage|storybook-static|\.git)(?:\/|$)/;
const TOKEN_SOURCE_RE = /packages\/luz\/src\/styles\.css$/;

function normalizeHex(raw) {
  let h = raw.toLowerCase();
  if (h.length === 4) h = '#' + [...h.slice(1)].map((c) => c + c).join('');
  if (h.length === 5) h = '#' + [...h.slice(1, 4)].map((c) => c + c).join('');
  if (h.length === 9) h = h.slice(0, 7);
  return h;
}

function lineOf(content, index) {
  let line = 1;
  for (let i = 0; i < index; i++) if (content.charCodeAt(i) === 10) line++;
  return line;
}

function isCommentLine(trimmed) {
  return trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*') || trimmed.startsWith('<!--');
}

/** Scan one file. Returns an array of findings. */
export function scanFile(filePath, contentArg) {
  const rel = filePath;
  if (SKIP_PATH_RE.test(rel) || TOKEN_SOURCE_RE.test(rel.replace(/\\/g, '/'))) return [];
  if (!SCAN_EXTS.has(extname(rel))) return [];

  let content = contentArg;
  if (content == null) {
    try {
      content = readFileSync(filePath, 'utf8');
    } catch {
      return [];
    }
  }

  const head = content.split('\n', 10).join('\n');
  if (head.includes('luz-lint-disable')) return [];

  const isTest = /\.(test|spec)\.[jt]sx?$/.test(basename(rel));
  const findings = [];

  const lines = content.split('\n');
  let suppressNext = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('luz-lint-ignore')) {
      // suppresses its own line and the next (JSX comments sit above the target)
      suppressNext = true;
      continue;
    }
    if (suppressNext) {
      suppressNext = false;
      continue;
    }
    const trimmed = line.trimStart();
    if (isCommentLine(trimmed)) continue;

    for (const rule of RULES) {
      rule.re.lastIndex = 0;
      let m;
      while ((m = rule.re.exec(line)) !== null) {
        if (rule.skipIf && rule.skipIf(line, m)) continue;
        findings.push({
          line: i + 1,
          col: m.index + 1,
          rule: rule.id,
          severity: isTest && rule.severity === 'error' ? 'warn' : rule.severity,
          snippet: m[0],
          message: rule.message,
          hint: typeof rule.hint === 'function' ? rule.hint(m) : rule.hint,
        });
        if (rule.re.lastIndex === m.index) rule.re.lastIndex++;
      }
    }
  }

  for (const f of fileLevelFindings(content)) {
    findings.push({
      ...f,
      severity: isTest && f.severity === 'error' ? 'warn' : f.severity,
      hint: typeof f.hint === 'function' ? f.hint() : f.hint,
    });
  }

  return findings.map((f) => ({ file: rel, ...f }));
}

export function scanFiles(paths) {
  const all = [];
  for (const p of paths) {
    try {
      if (!existsSync(p) || !statSync(p).isFile()) continue;
    } catch {
      continue;
    }
    all.push(...scanFile(p));
  }
  return all;
}

// ─── Git helpers ─────────────────────────────────────────────────────────────

function gitFiles(root, staged) {
  const opts = { cwd: root, encoding: 'utf8' };
  const out = [];
  const run = (args) => {
    const r = spawnSync('git', args, opts);
    return r.status === 0 ? r.stdout.split('\n').filter(Boolean) : [];
  };
  if (staged) {
    out.push(...run(['diff', '--name-only', '--cached', '--diff-filter=ACMR']));
  } else {
    out.push(...run(['diff', '--name-only', 'HEAD', '--diff-filter=ACMR']));
    out.push(...run(['ls-files', '--others', '--exclude-standard']));
  }
  return [...new Set(out)].map((f) => resolve(root, f));
}

// ─── CLI ─────────────────────────────────────────────────────────────────────

function main() {
  const argv = process.argv.slice(2);
  const flags = new Set(argv.filter((a) => a.startsWith('--')));
  const rootIdx = argv.indexOf('--root');
  const root = rootIdx !== -1 && argv[rootIdx + 1] ? resolve(argv[rootIdx + 1]) : process.cwd();
  const files = argv.filter((a, i) => !a.startsWith('--') && (rootIdx === -1 || i !== rootIdx + 1));

  let targets;
  if (files.length > 0) {
    targets = files.map((f) => resolve(root, f));
  } else {
    targets = gitFiles(root, flags.has('--staged'));
    if (targets.length === 0) {
      if (flags.has('--json')) {
        console.log(JSON.stringify({ findings: [], errors: 0, warnings: 0, files: 0 }));
      } else {
        console.log('luz-lint: no changed files to scan.');
      }
      return 0;
    }
  }

  const findings = scanFiles(targets);
  const errors = findings.filter((f) => f.severity === 'error');
  const warnings = findings.filter((f) => f.severity === 'warn');

  if (flags.has('--json')) {
    console.log(JSON.stringify({
      findings,
      errors: errors.length,
      warnings: warnings.length,
      files: new Set(findings.map((f) => f.file)).size,
    }, null, 2));
    return errors.length > 0 ? 1 : 0;
  }

  const byFile = new Map();
  for (const f of findings) {
    if (flags.has('--quiet') && f.severity !== 'error') continue;
    if (!byFile.has(f.file)) byFile.set(f.file, []);
    byFile.get(f.file).push(f);
  }

  for (const [file, fs] of byFile) {
    console.log(`\n${file}`);
    for (const f of fs.sort((a, b) => a.line - b.line || a.col - b.col)) {
      const sev = f.severity === 'error' ? 'error' : 'warn ';
      console.log(`  ${String(f.line).padStart(4)}:${String(f.col).padEnd(3)} ${sev} ${f.rule.padEnd(18)} ${f.snippet}  — ${f.message}`);
      if (f.hint) console.log(`       ${' '.repeat(4)}fix: ${f.hint}`);
    }
  }

  console.log(`\n${errors.length > 0 ? '✖' : warnings.length > 0 ? '⚠' : '✓'} luz-lint: ${errors.length} error${errors.length === 1 ? '' : 's'}, ${warnings.length} warning${warnings.length === 1 ? '' : 's'} across ${new Set(findings.map((f) => f.file)).size} file(s) (${targets.length} scanned)`);
  return errors.length > 0 ? 1 : 0;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  process.exit(main());
}
