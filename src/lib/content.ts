import { getCollection, type CollectionEntry } from 'astro:content';

export function isPublished(entry: { data: { draft: boolean } }) {
  return import.meta.env.DEV || !entry.data.draft;
}

export function byDateDescending<T extends { data: { date: Date } }>(a: T, b: T) {
  return b.data.date.getTime() - a.data.date.getTime();
}

function projectMonthIndex(value: string) {
  const [year, month] = value.split('.').map(Number);
  return year * 12 + month;
}

export function byProjectPeriodDescending<T extends { data: { startDate: string; endDate: string } }>(a: T, b: T) {
  return projectMonthIndex(b.data.endDate) - projectMonthIndex(a.data.endDate)
    || projectMonthIndex(b.data.startDate) - projectMonthIndex(a.data.startDate);
}

export function formatProjectPeriod(startDate: string, endDate: string) {
  return `${startDate}-${endDate}`;
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(date);
}

export function sitePath(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalizedPath}` || '/';
}

export async function getProfile(): Promise<CollectionEntry<'profile'>> {
  const profiles = await getCollection('profile');
  if (profiles.length !== 1) {
    throw new Error(`Expected exactly one profile.md, found ${profiles.length}.`);
  }
  return profiles[0];
}
