import { Injectable, signal } from '@angular/core';

export type InquiryType = 'lessons' | 'wedding' | 'other';

/**
 * Lets the Teaching and Weddings sections preselect the contact form's
 * inquiry type, so a visitor who clicked "Book a Lesson" does not have to
 * restate why they are writing.
 */
@Injectable({ providedIn: 'root' })
export class InquiryIntent {
  readonly type = signal<InquiryType>('other');

  set(type: InquiryType): void {
    this.type.set(type);
  }
}
