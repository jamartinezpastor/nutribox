import { readFileSync, writeFileSync } from 'fs';

const path = process.argv[2] || '/nginx.conf';
let conf = readFileSync(path, 'utf8');

// Nixpacks' generated nginx.conf can contain the same "location / { ... }"
// block twice in a row for PHP+Node (Laravel + Vite/Inertia) projects, which
// makes nginx fail with "duplicate location \"/\"" and crash on boot.
// Collapse consecutive duplicates of that block into a single occurrence.
const fixed = conf.replace(
  /(\s*location\s*\/\s*\{\s*try_files[^}]*\}\s*)\1+/g,
  '$1'
);

if (fixed !== conf) {
  writeFileSync(path, fixed);
  console.log('[fix-nginx-conf] Removed duplicate "location /" block from ' + path);
} else {
  console.log('[fix-nginx-conf] No duplicate "location /" block found, nginx.conf left unchanged.');
}
