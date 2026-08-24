/** Hero copy. Edit these strings and nothing else changes. */
export const HERO_CONTENT = {
  name: 'Andrea Liu',
  role: 'Violinist',
  tagline: 'Private violin instruction, and live music for weddings and events.',
  primaryCta: { label: 'Book a Lesson', target: '#teaching' },
  secondaryCta: { label: 'Hire for a Gig', target: '#weddings' },
} as const;

/**
 * The two photos under consideration. `srcset` lists only the widths that
 * actually exist on disk — the alternate's source is 2617px wide, so there is
 * no honest 3200 for it and claiming one would just upscale.
 *
 * Temporary: once a photo is chosen, keep its entry, drop the other, and fold
 * the alt text back into HERO_CONTENT.
 */
export const HERO_PHOTOS = {
  original: {
    src: 'hero',
    srcset: '1600w, 2400w, 3200w',
    alt: 'Andrea Liu resting her violin on her shoulder, looking down at the instrument, photographed against a dark background.',
  },
  alt: {
    src: 'hero-alt',
    srcset: '1600w, 2400w',
    alt: 'Andrea Liu standing with her violin held upright at her side, looking toward the camera, photographed against a dark background.',
  },
} as const;

export type HeroVariant = keyof typeof HERO_PHOTOS;
