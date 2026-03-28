import { component$, useStyles$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { QwikSpeakProvider } from 'qwik-speak';
import { config } from './speak-config';
import { translationFn } from './speak-functions';
import globalStyles from './global.css?inline';

export default component$(() => {
  useStyles$(globalStyles);

  return (
    <QwikCityProvider>
      <QwikSpeakProvider config={config} translationFn={translationFn}>
        <head>
          <meta charSet="utf-8" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="Handcrafted Salsa Macha. Artisanal, Spicy, Crunchy." />
          <link rel="preconnect" href="https://fonts.bunny.net" />
          <link
            href="https://fonts.bunny.net/css?family=open-sans:400,600,700|oswald:400,700,900&display=swap"
            rel="stylesheet"
          />
        </head>
        <body lang="en" class="bg-surface">
          <RouterOutlet />
          <ServiceWorkerRegister />
        </body>
      </QwikSpeakProvider>
    </QwikCityProvider>
  );
});
