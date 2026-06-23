#!/usr/bin/env node
// Verify the DDD folder layout: every leaf module under domains/<domain>/ must
// be a known layer (feature-*, ui, domain, data, util) and expose a barrel index.ts.
// Usage: node check-structure.mjs [domainsRoot]   (default: src/app/domains)
// Exit 0 = conformant (or nothing to check yet), 1 = violations found.

import { readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = process.argv[2] ?? 'src/app/domains';
const isLayer = (name) =>
  name === 'ui' ||
  name === 'domain' ||
  name === 'data' ||
  name === 'util' ||
  name === 'feature' ||
  name.startsWith('feature-');

const dirs = (p) =>
  readdirSync(p).filter((n) => !n.startsWith('.') && statSync(join(p, n)).isDirectory());

if (!existsSync(root)) {
  console.log(`NOTICE: no domains root at "${root}" — DDD structure not established yet, nothing to verify.`);
  process.exit(0);
}

const issues = [];
const domains = dirs(root);
if (domains.length === 0) issues.push(`No domains found under ${root}.`);

for (const domain of domains) {
  const domainPath = join(root, domain);
  const modules = dirs(domainPath);
  if (modules.length === 0) issues.push(`Domain "${domain}" has no layer modules.`);
  for (const mod of modules) {
    const modPath = join(domainPath, mod);
    if (!isLayer(mod)) {
      issues.push(`Unknown layer folder: ${modPath} (expected feature-*, ui, domain, data, or util).`);
    }
    if (!existsSync(join(modPath, 'index.ts'))) {
      issues.push(`Missing barrel: ${join(modPath, 'index.ts')} — module is not encapsulated.`);
    }
  }
}

if (issues.length === 0) {
  console.log(`OK: ${domains.length} domain(s) conform to the DDD layout.`);
  process.exit(0);
}

console.error(`STRUCTURE VIOLATIONS (${issues.length}):`);
for (const i of issues) console.error(`  - ${i}`);
process.exit(1);
