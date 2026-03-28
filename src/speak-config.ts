import type { SpeakConfig } from 'qwik-speak';

export const config: SpeakConfig = {
  defaultLocale: { lang: 'en', currency: 'EUR', timeZone: 'Europe/Zagreb' },
  supportedLocales: [
    { lang: 'en', currency: 'EUR', timeZone: 'Europe/Zagreb' },
    { lang: 'hr', currency: 'EUR', timeZone: 'Europe/Zagreb' }
  ],
  assets: ['app']
};
