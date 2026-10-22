import { readFileSync, writeFileSync } from 'fs';

const path = process.argv[2] || '/nginx.conf';
const conf = readFileSync(path, 'utf8');

// Nixpacks' generated nginx.conf can contain the same "location / { ... }"
// block twice (with differing indentation/whitespace between occurrences)
// for PHP+Node (Laravel + Vite/Inertia) projects, which makes nginx fail
// with "duplicate location \"/\"" and crash on boot. Keep only the first
// occurrence of that block, regardless of whitespace differences.
const locationBlockRe = /[ \t]*location\s*\/\s*\{\s*try_files\s+\$uri\s+\$uri\/\s+\/index\.php\?\$query_string;\s*\}\s*/g;

let seen = false;
let fixed = conf.replace(locationBlockRe, (match) => {
  if (!seen) {
    seen = true;
    return match;
  }
  return '';
});

// Laravel waits up to 120 seconds for Gemini. Nginx's default FastCGI
// read timeout is only 60 seconds, so it can return a 504 before Laravel
// finishes or handles the API timeout. Give PHP time to return its response.
// Remove existing directives first to keep repeated runs idempotent.
fixed = fixed.replace(/^[ \t]*fastcgi_read_timeout\s+[^;]+;[ \t]*(?:\r?\n|$)/gm, '');
fixed = fixed.replace(/^([ \t]*)fastcgi_pass\s+([^;]+);/gm, (_match, indent, upstream) =>
  `${indent}fastcgi_pass ${upstream};\n${indent}fastcgi_read_timeout 150s;`
);

if (fixed !== conf) {
  writeFileSync(path, fixed);
  console.log('[fix-nginx-conf] Fixed duplicate locations and set FastCGI read timeout to 150s in ' + path);
} else {
  console.log('[fix-nginx-conf] Nginx configuration already up to date.');
}
