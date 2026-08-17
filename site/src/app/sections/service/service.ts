import { Component, input, inject } from '@angular/core';
import { Reveal } from '../../core/reveal';
import { InquiryIntent } from '../../core/inquiry-intent';
import { ServiceContent } from './service.content';

/**
 * Shared layout for the Teaching and Weddings sections. Both have the same
 * shape — intro, a short list of points, one CTA — so they share a component
 * and differ only in content.
 */
@Component({
  selector: 'app-service',
  imports: [Reveal],
  templateUrl: './service.html',
  styleUrl: './service.scss',
})
export class Service {
  readonly content = input.required<ServiceContent>();

  private readonly intent = inject(InquiryIntent);

  /** Placeholder copy is bracketed; render it in a muted, obvious style. */
  protected isPlaceholder(text: string): boolean {
    return text.trimStart().startsWith('[');
  }

  protected onEnquire(): void {
    this.intent.set(this.content().intent);
  }
}
