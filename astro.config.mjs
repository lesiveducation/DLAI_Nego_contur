// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ch546333.tw1.ru',
  integrations: [sitemap()],
});
