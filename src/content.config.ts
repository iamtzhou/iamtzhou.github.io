import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const yearMonth = z.string().regex(/^\d{4}\.(?:[1-9]|1[0-2])$/, 'Use YYYY.M, for example 2026.5');
const monthIndex = (value: string) => {
  const [year, month] = value.split('.').map(Number);
  return year * 12 + month;
};

const profile = defineCollection({
  loader: glob({ pattern: 'profile.md', base: './src/content' }),
  schema: z.object({
    name: z.string(),
    nameZh: z.string().optional(),
    role: z.string(),
    affiliation: z.string(),
    location: z.string(),
    summary: z.string(),
    interests: z.array(z.string()).min(1),
    email: z.email(),
    links: z.object({
      github: z.url().optional(),
      cv: z.string().optional(),
    }),
    education: z.array(z.object({
      institution: z.string(),
      degree: z.string(),
      period: z.string(),
    })),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    startDate: yearMonth,
    endDate: yearMonth,
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    links: z.record(z.string(), z.url()).optional(),
  }).refine((project) => monthIndex(project.startDate) <= monthIndex(project.endDate), {
    message: 'endDate must not be earlier than startDate',
    path: ['endDate'],
  }),
});

const papers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/papers' }),
  schema: z.object({
    title: z.string(),
    year: z.number().int(),
    authors: z.array(z.string()).min(1),
    venue: z.string(),
    summary: z.string(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    links: z.record(z.string(), z.url()).optional(),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { profile, projects, papers, articles };
