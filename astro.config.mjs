// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://lesiveducation.github.io',
  base: '/DLAI_Nego_contur',
  integrations: [sitemap()],
});
