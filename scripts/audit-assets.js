const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      if (!full.includes('node_modules') && !full.includes('.next') && !full.includes('.git')) {
        results = results.concat(walk(full));
      }
    } else {
      results.push(full);
    }
  });
  return results;
}

const files = [
  ...walk('./app'),
  ...walk('./components'),
  ...walk('./data'),
  ...walk('./models'),
  ...walk('./lib'),
];

const refs = new Set();
const pattern = /(?:\/assets\/[a-zA-Z0-9_\-\.\/]+|\/images\/[a-zA-Z0-9_\-\.\/]+|\/videos\/[a-zA-Z0-9_\-\.\/]+|\/[a-zA-Z0-9_\-]+\.(?:png|jpg|jpeg|webp|mp4|svg|ico))/g;

files.forEach((f) => {
  const content = fs.readFileSync(f, 'utf8');
  let match;
  while ((match = pattern.exec(content)) !== null) {
    // Strip trailing query parameters e.g. ?v=11
    const clean = match[0].split('?')[0];
    refs.add(clean);
  }
});

console.log(`=== TOTAL REFERENCED ASSETS: ${refs.size} ===`);
const missing = [];
const ok = [];

Array.from(refs).sort().forEach((r) => {
  const localPath = path.join('./public', r.replace(/^\//, ''));
  const exists = fs.existsSync(localPath);
  if (exists) {
    ok.push(r);
    console.log(`[OK]      ${r}`);
  } else {
    missing.push(r);
    console.log(`[MISSING] ${r}`);
  }
});

console.log(`\nFound ${ok.length} existing referenced assets, ${missing.length} missing.`);

