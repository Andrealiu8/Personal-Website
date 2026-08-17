import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

/** Widths actually present on disk in public/img. */
const AVAILABLE_WIDTHS = [1600, 2400, 3200] as const;

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
  const requested = config.width ?? 2400;
  const width =
    AVAILABLE_WIDTHS.find((w) => w >= requested) ?? AVAILABLE_WIDTHS[AVAILABLE_WIDTHS.length - 1];
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
