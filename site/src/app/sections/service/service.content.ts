import { InquiryType } from '../../core/inquiry-intent';

export interface ServicePoint {
  readonly title: string;
  /** Text wrapped in [square brackets] renders as a visible placeholder. */
  readonly body: string;
}

export interface ServiceContent {
  readonly id: string;
  readonly label: string;
  readonly title: string;
  readonly intro: string;
  readonly points: readonly ServicePoint[];
  readonly ctaLabel: string;
  readonly intent: InquiryType;
}

/* ---------------------------------------------------------------------------
 * TEACHING
 * Anything in [square brackets] is a placeholder awaiting Andrea's details.
 * Deliberately not invented: nothing here claims a location, age range, rate,
 * or format that has not been confirmed.
 * ------------------------------------------------------------------------- */
export const TEACHING_CONTENT: ServiceContent = {
  id: 'teaching',
  label: 'Teaching',
  title: 'Violin Lessons',
  intro:
    'Drawing from years of performing, mentoring and pedagogy experience, Andrea works with students of all ages to build strong techique and artistry.',
  points: [
    {
      title: 'Who I teach',
      body: 'Beginner through advanced students are welcome',
    },
    {
      title: 'Where lessons happen',
      body: 'In person in the Chicago area and online options',
    },
    {
      title: 'Lesson length & rates',
      body: 'Rates available on request',
    },
  ],
  ctaLabel: 'Enquire about lessons',
  intent: 'lessons',
};

/* ---------------------------------------------------------------------------
 * WEDDINGS
 * ------------------------------------------------------------------------- */
export const WEDDINGS_CONTENT: ServiceContent = {
  id: 'weddings',
  label: 'Weddings & Events',
  title: 'Live Music for Your Day',
  intro:
    'Your love story deserves its own soundtrack.',
  points: [
    {
      title: 'Ensembles',
      body: 'Solo violin, duo, trio, or string quartet options available',
    },
    {
      title: 'Where I perform',
      body: 'Greater Chicago Area',
    },
    {
      title: 'Repertoire',
      body: 'Andrea curates classical, contemporary, and pop arrangements tailored to the couples request',
    },
    {
      title: 'Booking & pricing',
      body: 'Quotes on request',
    },
  ],
  ctaLabel: 'Enquire about your date',
  intent: 'wedding',
};
