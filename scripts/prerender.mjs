import { readFile, writeFile } from 'node:fs/promises';
import { render } from '../.cache/ssr/entry-server.js';

const file = new URL('../dist/index.html', import.meta.url);
const template = await readFile(file, 'utf8');
if (!template.includes('<!--app-html-->')) throw new Error('Prerender placeholder missing.');
await writeFile(file, template.replace('<!--app-html-->', render()));
console.log('Prerendered the portfolio for fast first paint and readable HTML.');
