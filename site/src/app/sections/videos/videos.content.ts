export interface VideoItem {
  readonly title: string;
  readonly detail: string;
  /**
   * YouTube video ID only — not the whole URL.
   * From https://www.youtube.com/watch?v=dQw4w9WgXcQ the id is dQw4w9WgXcQ.
   * Leave as null to keep the card as a placeholder.
   */
  readonly youtubeId: string | null;
}

/* ---------------------------------------------------------------------------
 * To add a real video: replace the title and detail, then paste the video's
 * id into youtubeId. Nothing else needs to change — the card switches from a
 * placeholder to a click-to-play thumbnail automatically.
 * ------------------------------------------------------------------------- */
export const VIDEOS_CONTENT = {
  label: 'Videos',
  title: 'Listen',
  intro: '[Add a sentence introducing your recordings, if you would like one.]',
  items: [
    { title: '[Piece title]', detail: '[Composer · Venue · Year]', youtubeId: null },
    { title: '[Piece title]', detail: '[Composer · Venue · Year]', youtubeId: null },
    { title: '[Piece title]', detail: '[Composer · Venue · Year]', youtubeId: null },
  ] as readonly VideoItem[],
} as const;
