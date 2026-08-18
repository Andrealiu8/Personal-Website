/**
 * Andrea's biography, supplied verbatim. Edit the paragraphs here; the
 * template renders whatever is in this array.
 */
export const ABOUT_CONTENT = {
  label: 'About',
  title: 'About Andrea',
  paragraphs: [
    'Violinist Andrea Liu is a graduate of Northwestern University, where she double-majored in Violin Performance and Biological Sciences, studying with Desiree Ruhstrat at the Bienen School of Music. A dedicated chamber and orchestral musician, Andrea served as Principal Second of the Northwestern University Chamber Orchestra and performed as a soloist with the Bienen School’s Baroque Music Ensemble.',
    'Her training includes summers at the Boston University Tanglewood Institute, where she performed with the Young Artist Orchestra and String Quartet Intensive Program under Peter Zazofsky and Miguel Perez-Espejo Cardenas, as well as studies at the Borromeo Music Festival and the Green Mountain Summer Festival with Won Bin Yim.',
    'Earlier in her career, Andrea spent eight years with the Denver Young Artist Orchestra, rising from String Ensemble to Young Artist Orchestra and holding positions from Concertmaster to Principal Second, and performed at Carnegie Hall as a member of that ensemble.',
    'Andrea now works as a freelance musician and teacher and performs with the Northwestern Medical Orchestra and Lakeview Orchestra, while pursuing a career in biotech.',
  ],
  /** Pulled out of the bio so the highlights are scannable. */
  highlights: [
    { value: 'Northwestern University', detail: 'Violin Performance & Biological Sciences' },
    { value: 'Carnegie Hall', detail: 'Performed with the Denver Young Artist Orchestra' },
    { value: 'Tanglewood', detail: 'Boston University Tanglewood Institute' },
    { value: 'Principal Second', detail: 'Northwestern University Chamber Orchestra' },
  ],
} as const;
