import { readFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

const root = fileURLToPath(new URL('..', import.meta.url));
const html = await readFile(resolve(root, 'dist/index.html'), 'utf8');
const document = new JSDOM(html).window.document;
const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
const base = canonical ? new URL(canonical).pathname : '/';
assert.equal(document.title, 'Rama Gangumalla | Data Engineer');
assert.equal(document.querySelectorAll('h1').length, 1);
assert.equal(document.querySelectorAll('.skill-tile').length, 35);
assert.equal(document.querySelectorAll('.work-panel').length, 4);
assert.equal(document.querySelectorAll('.timeline-item').length, 4);
assert.equal(document.querySelector('.profile-card-top > span').textContent, 'Rama Gangumalla');
assert.equal(document.querySelector('.profile-photo img').getAttribute('src'), `${base}assets/rama-portrait-about.jpg`);
assert.equal(document.querySelectorAll('.video-toggle').length, 1);
assert.equal(document.querySelectorAll('.intro-trigger, .video-progress').length, 0);
assert.equal(document.querySelector('video').getAttribute('preload'), 'auto');
assert(!document.querySelector('video').hasAttribute('loop'));
assert(!html.includes('<!--app-html-->') && !html.includes('__SITE_URL__'));
assert(!html.includes('chatgpt.site'));
for (const element of document.querySelectorAll('[href], [src]')) {
  const value = element.getAttribute('href') ?? element.getAttribute('src');
  if (!value) continue;
  assert(!value.startsWith('blob:') && !value.includes('oaiusercontent.com'));
  if (value.startsWith('#')) assert(document.getElementById(value.slice(1)), `Missing anchor: ${value}`);
  if (value.startsWith('/') && !value.startsWith('//')) {
    assert(value.startsWith(base), `Incorrect deployment base: ${value}`);
    assert((await stat(resolve(root, 'dist', value.slice(base.length)))).isFile(), `Missing asset: ${value}`);
  }
}
const downloads = [...document.querySelectorAll('a[download]')];
assert.equal(downloads.length, 2);
for (const download of downloads) {
  assert.equal(download.getAttribute('href'), `${base}assets/Rama-Gangumalla-Resume.pdf`);
  assert.equal(download.getAttribute('download'), 'Rama-Gangumalla-Resume.pdf');
}
if (canonical) {
  assert.equal(document.querySelector('meta[property="og:url"]').getAttribute('content'), canonical);
  assert.equal(document.querySelector('meta[property="og:image"]').getAttribute('content'), `${canonical}assets/social-preview.jpg`);
  assert.equal(document.querySelector('meta[name="twitter:image"]').getAttribute('content'), `${canonical}assets/social-preview.jpg`);
}
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
for (const name of ['Rama-Gangumalla-Resume.pdf', 'rama-introduction.mp4', 'hero-scene.jpg', 'rama-portrait-about.jpg']) {
  assert.equal(sha(await readFile(resolve(root, 'public/assets', name))), sha(await readFile(resolve(root, 'dist/assets', name))));
}
console.log(`Verified built content, media, links, and metadata for ${canonical ?? 'local preview'}.`);
