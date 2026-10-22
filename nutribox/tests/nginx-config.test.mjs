import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmdirSync, unlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const script = fileURLToPath(new URL('../fix-nginx-conf.mjs', import.meta.url));
const location = 'location / { try_files $uri $uri/ /index.php?$query_string; }';

function fix(conf, times = 1) {
  const dir = mkdtempSync(join(tmpdir(), 'nutribox-nginx-'));
  const path = join(dir, 'nginx.conf');
  try {
    writeFileSync(path, conf);
    for (let i = 0; i < times; i++) {
      execFileSync(process.execPath, [script, path]);
    }
    return readFileSync(path, 'utf8');
  } finally {
    unlinkSync(path);
    rmdirSync(dir);
  }
}

const config = `events {}
http {
    server {
        ${location}
        location ~ \\.php$ {
            fastcgi_pass 127.0.0.1:9000;
            fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
            include /nix/store/nginx/conf/fastcgi_params;
        }
    }
}
`;

test('gives PHP more than the 120-second Gemini request timeout', () => {
  const result = fix(config);
  assert.match(result, /fastcgi_pass 127\.0\.0\.1:9000;\n\s+fastcgi_read_timeout 150s;/);
  assert.match(result, /fastcgi_param SCRIPT_FILENAME \$realpath_root\$fastcgi_script_name;/);
  assert.match(result, /include \/nix\/store\/nginx\/conf\/fastcgi_params;/);
});

test('still removes duplicate Laravel locations', () => {
  const result = fix(config.replace(location, `${location}\n\t${location}`));
  assert.equal((result.match(/location\s+\/\s*\{/g) || []).length, 1);
  assert.equal((result.match(/fastcgi_read_timeout 150s;/g) || []).length, 1);
});

test('replaces an existing shorter FastCGI timeout without duplicates', () => {
  const result = fix(config.replace('fastcgi_pass', 'fastcgi_read_timeout 60s;\n            fastcgi_pass'));
  assert.equal((result.match(/fastcgi_read_timeout/g) || []).length, 1);
  assert.match(result, /fastcgi_read_timeout 150s;/);
});

test('repeated startup transformations do not duplicate timeout directives', () => {
  assert.equal(fix(config, 2), fix(config));
});

test('handles generated configuration with Windows line endings', () => {
  assert.equal((fix(config.replaceAll('\n', '\r\n'), 2)).match(/fastcgi_read_timeout/g).length, 1);
});
