import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const base = env.PAGES_BASE_PATH ? `${env.PAGES_BASE_PATH.replace(/\/+$/, '')}/` : '/';
  const siteUrl = env.PAGES_SITE_URL ? `${env.PAGES_SITE_URL.replace(/\/+$/, '')}/` : '';
  return {
    base,
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'portfolio-site-metadata',
        transformIndexHtml(html) {
          return siteUrl
            ? html.replaceAll('__SITE_URL__', siteUrl)
            : html.split('\n').filter(line => !line.includes('__SITE_URL__')).join('\n');
        },
      },
    ],
    server: { host: '0.0.0.0', port: 4173, strictPort: true },
    build: { outDir: 'dist' },
  };
});
