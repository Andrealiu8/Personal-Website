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
    '[Add a short welcome here — two or three sentences on your teaching philosophy and what a student can expect from working with you.]',
  points: [
    {
      title: 'Who I teach',
      body: '[Which ages and levels you take — for example beginners through advanced, children, adults, or audition preparation.]',
    },
    {
      title: 'Where lessons happen',
      body: '[Your studio location, whether you travel to students, and whether you offer online lessons.]',
    },
    {
      title: 'Lesson length & rates',
      body: '[Lesson lengths you offer and your rates, or simply "Rates available on request" if you would rather discuss it directly.]',
    },
    {
      title: 'What to bring',
      body: '[Whether students need their own instrument, plus any books or materials you start with.]',
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
    '[Add two or three sentences on what it is like to work with you — how you help couples choose music, and the atmosphere you bring to a ceremony or reception.]',
  points: [
    {
      title: 'Ensembles',
      body: '[Which configurations you offer — solo violin, duo, trio, or string quartet — and how each suits different spaces.]',
    },
    {
      title: 'Where I perform',
      body: '[The area you cover and whether you travel further for an additional fee.]',
    },
    {
      title: 'Repertoire',
      body: '[A few sample pieces across classical, contemporary, and popular arrangements, and whether you take requests.]',
    },
    {
      title: 'Booking & pricing',
      body: '[How far ahead to book, what a booking includes, and your pricing or "Quotes on request".]',
    },
  ],
  ctaLabel: 'Enquire about your date',
  intent: 'wedding',
};
