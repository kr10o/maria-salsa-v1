import { component$, Slot } from '@builder.io/qwik';
import { type RequestHandler } from '@builder.io/qwik-city';
import { UAParser } from 'uaparser.js';
import { Analytics } from '@analytics/core';
import { drizzle } from 'drizzle-orm/d1';
import { analytics as analyticsTable } from '../database/schema';

export const onRequest: RequestHandler = async ({ request, platform, clientConn }) => {
  if (request.url.includes('/build/') || request.url.includes('/assets/') || request.url.includes('favicon')) {
    return; // Ignore static assets
  }

  try {
    const userAgent = request.headers.get('user-agent') || '';
    const ipCountry = request.headers.get('CF-IPCountry') || 'UNKNOWN';
    const parser = new UAParser(userAgent);
    const parsed = parser.getResult();
    
    const analytics = Analytics({ app: 'lamaria-spa', plugins: [] });
    // In Edge environment, window is not defined, we provide mock context
    const eventContext = { anonymousId: 'user_' + Math.random().toString(36).slice(2) };

    const dbPlatform = (platform as any).env?.DB;
    if (dbPlatform) {
       const db = drizzle(dbPlatform);
       await db.insert(analyticsTable).values({
         anonymousId: eventContext.anonymousId || clientConn.ip || 'anonymous',
         event: 'page_view',
         path: new URL(request.url).pathname,
         country: ipCountry,
         browserName: parsed.browser.name || 'Unknown',
         osName: parsed.os.name || 'Unknown',
         deviceType: parsed.device.type || 'desktop',
         created_at: new Date()
       }).execute();
    }
  } catch (err) {
    console.error("Analytics insertion failed:", err);
  }
};

export default component$(() => {
  return <Slot />;
});
