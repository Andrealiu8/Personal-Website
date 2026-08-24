import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { Hero } from '../../sections/hero/hero';
import { HeroVariant } from '../../sections/hero/hero.content';
import { About } from '../../sections/about/about';
import { Service } from '../../sections/service/service';
import { Videos } from '../../sections/videos/videos';
import { Contact } from '../../sections/contact/contact';
import { TEACHING_CONTENT, WEDDINGS_CONTENT } from '../../sections/service/service.content';

/**
 * The one real page. It is routed only so the hero photo under review can be
 * swapped by URL: `/` renders the original, `/alt` the alternate. Both routes
 * point here, so the rest of the page is genuinely identical between them and
 * the photo is the only variable.
 */
@Component({
  selector: 'app-home',
  imports: [Hero, About, Service, Videos, Contact],
  templateUrl: './home.html',
})
export class Home {
  protected readonly teaching = TEACHING_CONTENT;
  protected readonly weddings = WEDDINGS_CONTENT;

  /* Read from route data rather than the URL string so the two routes stay
     declarative. Safe as a snapshot: the routes use different paths, so Angular
     builds a fresh component instead of reusing this one — which also matters
     because NgOptimizedImage rejects an ngSrc that changes after init. */
  protected readonly heroVariant: HeroVariant =
    inject(ActivatedRoute).snapshot.data['heroVariant'] ?? 'original';

  constructor() {
    /* The comparison route is a scratch page, not something to be indexed or
       shared. Removed along with the route once a photo is chosen. */
    if (this.heroVariant === 'alt') {
      inject(Meta).addTag({ name: 'robots', content: 'noindex, nofollow' });
    }
  }
}
