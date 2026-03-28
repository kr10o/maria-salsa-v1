# Architectural Knowledge Base

## State Management Translation (Alpine to Qwik)
The legacy app relies on Alpine.js for localized state, which hurts Time to Interactive (TTI).
* **Legacy:** `<div x-data="{ isCartOpen: false, cart: [] }">`
* **Modern (Qwik):** ```typescript
    const appState = useStore({ isCartOpen: false, cart: [] }, { deep: true });
    ```
* **Events:** Legacy `@click="isCartOpen = !isCartOpen"` becomes `onClick$={() => appState.isCartOpen = !appState.isCartOpen}` in Qwik.

## UAParser.js + getanalytics.io at the Edge
Traditional trackers introduce client-side bundle bloat and privacy concerns. We leverage Cloudflare Workers for first-party tracking.

**Execution Flow:**
1.  The `onRequest` middleware inside `src/routes/layout.tsx` intercepts the request.
2.  Extract headers: `CF-IPCountry` and `user-agent`.
3.  Instantiate `UAParser` with the `user-agent` string to reliably extract `browser.name`, `os.name`, and `device.type`.
4.  Use `getanalytics.io` (running server-side) to construct a standardized tracking payload.
5.  Execute a non-blocking Drizzle ORM `db.insert(analytics)` query to store the enriched data in Cloudflare D1.

## External Data Fetching
Avoid fetching the raw GitHub JSON directly from the browser. Use `routeLoader$` so the Cloudflare Worker executes the network request, serializing the JSON result directly into the generated HTML markup.