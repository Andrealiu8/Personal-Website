/* ---------------------------------------------------------------------------
 * Contact configuration — this is the file to edit before going live.
 * ------------------------------------------------------------------------- */
export const CONTACT_CONFIG = {
  /**
   * Formspree form id. Sign up at https://formspree.io, create a form, and
   * paste the id from the endpoint it gives you:
   *   https://formspree.io/f/abcdwxyz   ->   'abcdwxyz'
   *
   * While this is null the form stays disabled and the page shows the email
   * link instead, so nobody can submit into a void.
   */
  formspreeId: null as string | null,

  /** Public email address. null hides the link and shows a placeholder. */
  email: 'Andrealiuviolin@gmail.com',

  /** Optional. null hides it entirely. */
  phone: null as string | null,

  /** Optional social links. Delete any you do not use. */
  socials: [] as readonly { readonly label: string; readonly url: string }[],

  /** Optional photographer credit shown in the footer. */
  photoCredit: null as string | null,
} as const;

export const CONTACT_CONTENT = {
  label: 'Contact',
  title: 'Get in Touch',
  intro: 'For lessons, weddings, or any other enquiry, send a note and I will get back to you.',
  inquiryOptions: [
    { value: 'lessons', label: 'Violin lessons' },
    { value: 'wedding', label: 'Wedding or event' },
    { value: 'other', label: 'Something else' },
  ],
} as const;
