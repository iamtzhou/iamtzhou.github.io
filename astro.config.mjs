import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://iamtzhou.github.io',
  base: '/',
  devToolbar: { enabled: false },
  output: 'static',
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
});
