import { server$, type RequestEvent } from '@builder.io/qwik-city';
import type { TranslationFn } from 'qwik-speak';
import { drizzle } from 'drizzle-orm/d1';
import { translations } from './database/schema';
import { eq } from 'drizzle-orm';

const loadTranslationFn = server$(async function(this: RequestEvent, lang: string, asset: string) {
  const dbPlatform = (this.platform as any).env?.DB;
  if (!dbPlatform) {
    // Return mock for build times or if D1 is not bound correctly
    if (lang === 'en') return { 'hero.title_start': 'HANDCRAFTED', 'hero.title_mid': 'SALSA', 'hero.title_end': 'MACHA' };
    return {};
  }
  const db = drizzle(dbPlatform);
  const results = await db.select().from(translations).where(eq(translations.lang, lang)).all();

  const dict: Record<string, string> = {};
  for (const row of results) {
    dict[row.key] = row.value;
  }
  
  return dict;
});

export const translationFn: TranslationFn = {
  loadTranslation$: loadTranslationFn
};
