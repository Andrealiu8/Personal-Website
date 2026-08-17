import { Injectable, signal } from '@angular/core';

/**
 * Tracks which section is in view so the nav can highlight it, and whether the
 * reader has scrolled past the hero so the nav can go opaque.
 *
 * Browser-only: observe() is called from an afterNextRender hook.
 */
@Injectable({ providedIn: 'root' })
export class ActiveSection {
  /** Fragment id of the section currently in view, e.g. 'about'. */
  readonly current = signal<string>('home');

  /** True once the hero has scrolled out of the way. */
  readonly pastHero = signal(false);

  private observer?: IntersectionObserver;
  private heroObserver?: IntersectionObserver;
  private ids: readonly string[] = [];
  private resizeTimer?: ReturnType<typeof setTimeout>;

  observe(ids: readonly string[]): void {
    this.ids = ids;
    this.build();

    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimer);
      // The probe band is measured in pixels, so it has to be rebuilt when the
      // viewport changes. Debounced: resize fires continuously while dragging.
      this.resizeTimer = setTimeout(() => this.build(), 200);
    });
  }

  private build(): void {
    this.observer?.disconnect();
    this.heroObserver?.disconnect();

    const sections = this.ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const navHeight = document.querySelector('.nav')?.getBoundingClientRect().height ?? 0;

    /*
     * A thin horizontal probe band decides the active section: whichever
     * section crosses it wins. This replaces comparing intersectionRatio
     * across sections, which is unsound — ratio is relative to each element's
     * own area, so a tall section scores lower than a short one even when it
     * dominates the screen. That bug left "Home" highlighted while About
     * filled the viewport.
     *
     * The band sits below the nav *and* below where an anchored section lands
     * (scroll-margin-top), so clicking a nav link lights up that same link.
     */
    const bandTop = navHeight + 40;
    const bandHeight = 24;
    const bandBottom = Math.max(0, window.innerHeight - bandTop - bandHeight);

    this.observer = new IntersectionObserver(
      (entries) => {
        const crossing = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target as HTMLElement);

        if (crossing.length === 0) return;

        // A section boundary can fall inside the band, so two sections may
        // cross at once. The later one in document order is the one being
        // scrolled into.
        const winner = crossing.reduce((latest, el) =>
          latest.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING ? el : latest,
        );

        this.current.set(winner.id);
      },
      { rootMargin: `-${bandTop}px 0px -${bandBottom}px 0px`, threshold: 0 },
    );

    for (const section of sections) {
      this.observer.observe(section);
    }

    const hero = document.getElementById('home');
    if (hero) {
      this.heroObserver = new IntersectionObserver(
        ([entry]) => this.pastHero.set(!entry.isIntersecting),
        { rootMargin: '-70% 0px 0px 0px' },
      );
      this.heroObserver.observe(hero);
    }
  }
}
