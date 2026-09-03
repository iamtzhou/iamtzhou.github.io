import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { sitePath } from '../lib/content';

const staticPaths = [
  '/',
  '/articles/',
  '/cv/',
  '/projects/',
  '/publications/',
];

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error('The Astro site option is required to generate sitemap.xml.');
  }

  const [articles, projects, publications] = await Promise.all([
    getCollection('articles'),
    getCollection('projects'),
    getCollection('publications'),
  ]);

  const contentPaths = [
    ...articles
      .filter((article) => !article.data.draft)
      .map((article) => `/articles/${article.id}/`),
    ...projects
      .filter((project) => !project.data.draft)
      .map((project) => `/projects/${project.id}/`),
    ...publications
      .filter((publication) => !publication.data.draft)
      .map((publication) => `/publications/${publication.id}/`),
  ];

  const urls = [...new Set([...staticPaths, ...contentPaths]
    .map((path) => new URL(sitePath(path), site).href))]
    .sort();

  const entries = urls
    .map((url) => `  <url>\n    <loc>${escapeXml(url)}</loc>\n  </url>`)
    .join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
