import { readFileSync, writeFileSync } from 'fs';

const path = process.argv[2] || '/nginx.conf';
let conf = readFileSync(path, 'utf8');

// Nixpacks' generated nginx.conf can contain the same "location / { ... }"
// block twice (with differing indentation/whitespace between occurrences)
// for PHP+Node (Laravel + Vite/Inertia) projects, which makes nginx fail
// with "duplicate location \"/\"" and crash on boot. Keep only the first
// occurrence of that block, regardless of whitespace differences.
const locationBlockRe = /[ \t]*location\s*\/\s*\{\s*try_files\s+\$uri\s+\$uri\/\s+\/index\.php\?\$query_string;\s*\}\s*/g;

let seen = false;
const fixed = conf.replace(locationBlockRe, (match) => {
  if (!seen) {
    seen = true;
    return match;
  }
  return '';
});

if (fixed !== conf) {
  writeFileSync(path, fixed);
  console.log('[fix-nginx-conf] Removed duplicate "location /" block(s) from ' + path);
} else {
  console.log('[fix-nginx-conf] No duplicate "location /" block found, nginx.conf left unchanged.');
}
