import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

/**
 * Widths actually present on disk in public/img, ascending, per logical name.
 * Per-image rather than one shared list because the two images are asked for
 * at very different sizes: the hero is full-bleed, the about portrait never
 * exceeds a ~400px column, so shipping it at hero widths would be waste.
 * Add a key here whenever you add a new set of derivatives.
 */
const AVAILABLE_WIDTHS: Record<string, readonly number[]> = {
  hero: [1600, 2400, 3200],
  'about-portrait': [600, 900, 1200],
};

/**
 * Maps a logical name plus a requested width onto the real file we generated
 * with sips, e.g. ('hero', 2400) -> 'img/hero-2400.jpg'.
 *
 * This is required: NgOptimizedImage's default loader returns the same URL for
 * every width, which would produce a srcset of three identical entries. Paths
 * are relative so they resolve against <base href>, keeping the build
 * host-agnostic while the GitHub Pages base-href is still undecided.
 */
export function localImageLoader(config: ImageLoaderConfig): string {
  const widths = AVAILABLE_WIDTHS[config.src];
  if (!widths) {
    throw new Error(
      `No derivative widths registered for image '${config.src}'. ` +
        `Generate them into public/img and add the name to AVAILABLE_WIDTHS.`,
    );
  }

  const largest = widths[widths.length - 1];
  // No width means NgOptimizedImage is filling the plain `src`, which every
  // browser then overrides from the srcset — serve the largest so the fallback
  // is never the blurry one.
  const requested = config.width ?? largest;
  const width = widths.find((w) => w >= requested) ?? largest;
  return `img/${config.src}-${width}.jpg`;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(),
    { provide: IMAGE_LOADER, useValue: localImageLoader },
  ],
};
