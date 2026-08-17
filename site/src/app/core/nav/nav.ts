import { Component, afterNextRender, inject } from '@angular/core';
import { ActiveSection } from '../active-section';

export interface NavLink {
  readonly id: string;
  readonly label: string;
}

/** The four labels Andrea asked for. Teaching and Weddings are reached from
 *  the hero CTAs rather than the bar, to keep it uncluttered. */
export const NAV_LINKS: readonly NavLink[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'videos', label: 'Videos' },
  { id: 'contact', label: 'Contact' },
];

/** Every section the scroll-spy watches, including the two not in the bar. */
const WATCHED = ['home', 'about', 'teaching', 'weddings', 'videos', 'contact'] as const;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  private readonly sections = inject(ActiveSection);

  protected readonly links = NAV_LINKS;
  protected readonly solid = this.sections.pastHero;
  protected readonly active = this.sections.current;

  constructor() {
    afterNextRender(() => this.sections.observe(WATCHED));
  }

  /**
   * Teaching and Weddings are not in the bar, so highlight their nearest
   * parent link instead of leaving nothing lit while they are in view.
   */
  protected isActive(id: string): boolean {
    const current = this.active();
    if (current === 'teaching' || current === 'weddings') {
      return id === 'about';
    }
    return current === id;
  }
}
