# Andrea Liu — violin teaching & wedding performance

One continuous scrolling page: Home, About, Teaching, Weddings, Videos, Contact. Built with
Angular 22, prerendered to static HTML.

## Running it

```bash
npm start            # dev server at http://localhost:4200
npm run build        # static build into dist/site/browser
npm run preview      # serve the built site at http://localhost:4321
npm run lint         # ESLint, including template accessibility rules
npm run format       # Prettier
```

Deployment instructions, including the GitHub Pages base-href trap, are in
[DEPLOY.md](./DEPLOY.md).

## Editing the content

**You should not need to touch a template to change wording.** Each section keeps its copy in
a `*.content.ts` file:

| To change                        | Edit                                          |
| -------------------------------- | --------------------------------------------- |
| Name, tagline, hero button text  | `src/app/sections/hero/hero.content.ts`       |
| Your biography                   | `src/app/sections/about/about.content.ts`     |
| Teaching and Weddings sections   | `src/app/sections/service/service.content.ts` |
| Videos                           | `src/app/sections/videos/videos.content.ts`   |
| Email, Formspree, socials, phone | `src/app/sections/contact/contact.content.ts` |

Anything written in `[square brackets]` shows up on the page in italics with a grey bar beside
it. That is intentional — it marks copy that still needs writing so it cannot ship unnoticed.
Replacing the bracketed text with real text makes the marker disappear automatically.

### Adding a video

In `videos.content.ts`, set `youtubeId` to the id from the YouTube URL — for
`https://www.youtube.com/watch?v=dQw4w9WgXcQ` the id is `dQw4w9WgXcQ`. The card turns into a
click-to-play thumbnail on its own. Nothing is requested from YouTube until a visitor presses
play, which keeps the page fast and sets no third-party cookies before then.

### Replacing the photo

Regenerate the three sizes the page uses, from any high-resolution original:

```bash
for w in 1600 2400 3200; do
  sips -s format jpeg -s formatOptions 84 -Z $w "photo.heic" --out "public/img/hero-$w.jpg"
done
```

If the new photo is framed differently, adjust `object-position` in
`src/app/sections/hero/hero.scss` — there is one value for mobile and one for desktop, both
commented.

## Notes for whoever works on this next

- **Static, not SSR.** `angular.json` sets `outputMode: "static"`, so `ng build` prerenders and
  emits no server bundle. There is deliberately no `server.ts`.
- **Images.** A custom `IMAGE_LOADER` in `app.config.ts` maps widths onto the real files on
  disk. `NgOptimizedImage`'s default loader cannot do this — it returns one URL for every width,
  producing a srcset of identical entries.
- **Animation.** Uses CSS keyframes plus `IntersectionObserver`, not `@angular/animations`,
  which is now legacy in v22. `prefers-reduced-motion` is honoured throughout.
- **Colour.** Every pair in `styles.scss` has its measured contrast ratio in a comment.
  `--rule` (1.26:1) is decorative only; form borders must use `--field` (3.71:1). Don't swap
  them.
- **Scroll-spy.** `active-section.ts` uses a thin probe band rather than comparing
  `intersectionRatio`, which is unsound across sections of different heights.
