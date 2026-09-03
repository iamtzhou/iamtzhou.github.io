import type { APIRoute } from 'astro';
import { sitePath } from '../lib/content';

export const GET: APIRoute = ({ site }) => {
  if (!site) {
    throw new Error('The Astro site option is required to generate robots.txt.');
  }

  const sitemapUrl = new URL(sitePath('/sitemap.xml'), site).href;
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
