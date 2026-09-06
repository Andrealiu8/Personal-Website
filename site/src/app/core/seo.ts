import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

/**
 * Sets the page title, social preview tags, and structured data. Runs during
 * prerendering, so all of this lands in the static HTML where crawlers see it
 * without executing JavaScript.
 *
 * SITE_URL is the deployed origin *including* the project-site subpath, because
 * Open Graph requires absolute URLs — relative paths will not work for link
 * previews. Change it here, in public/robots.txt, and in public/sitemap.xml if
 * the site ever moves to a custom domain.
 */
const SITE_URL = 'https://andrealiu8.github.io/Personal-Website';

const DESCRIPTION =
  'Violinist Andrea Liu, a Northwestern University graduate, offers private violin lessons and live music for weddings and events.';

@Injectable({ providedIn: 'root' })
export class Seo {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  apply(): void {
    const pageTitle = 'Andrea Liu — Violinist | Lessons & Wedding Performance';
    this.title.setTitle(pageTitle);

    this.meta.addTags([
      { name: 'description', content: DESCRIPTION },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content: DESCRIPTION },
      { property: 'og:url', content: SITE_URL },
      { property: 'og:image', content: `${SITE_URL}/img/hero-1600.jpg` },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: pageTitle },
      { name: 'twitter:description', content: DESCRIPTION },
      { name: 'twitter:image', content: `${SITE_URL}/img/hero-1600.jpg` },
    ]);

    this.addStructuredData();
  }

  /**
   * Person + offerings. A LocalBusiness block should be added once Andrea
   * confirms her teaching city — that is what surfaces her for searches like
   * "violin lessons near me", and inventing an address would be worse than
   * omitting one.
   */
  private addStructuredData(): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Andrea Liu',
      jobTitle: 'Violinist',
      description: DESCRIPTION,
      url: SITE_URL,
      image: `${SITE_URL}/img/hero-1600.jpg`,
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Northwestern University',
      },
      knowsAbout: ['Violin performance', 'Chamber music', 'Wedding music', 'Violin instruction'],
    };

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data, null, 2);
    this.document.head.appendChild(script);
  }
}
