import { Directive, ElementRef, afterNextRender, inject } from '@angular/core';

/**
 * Fades and lifts an element in as it enters the viewport.
 *
 * Content is visible by default; the hidden state is only applied once this
 * directive runs, so the prerendered HTML is never blank if JS fails to load.
 * `afterNextRender` guarantees this never executes during prerendering, where
 * IntersectionObserver does not exist.
 */
@Directive({
  selector: '[appReveal]',
})
export class Reveal {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    afterNextRender(() => {
      const el = this.host.nativeElement;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      el.dataset['reveal'] = 'armed';

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              el.dataset['reveal'] = 'in';
              observer.disconnect();
            }
          }
        },
        { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
      );

      observer.observe(el);
    });
  }
}
