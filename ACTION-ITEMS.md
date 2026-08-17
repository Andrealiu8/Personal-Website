# Action items for Andrea

The site is built and working. Everything below is something only you can supply.

Anywhere copy is missing, the page shows it in *italics with a grey bar* — like
*[Add your email address]*. That's deliberate, so nothing half-finished ships by accident.
Replace the bracketed text and the marker disappears on its own.

To see your changes: `cd site && npm start`, then open http://localhost:4200.

---

## 1. Blocking — the site can't go live without these

### 1.1 Your email address

**File:** `site/src/app/sections/contact/contact.content.ts`

```ts
email: null as string | null,        →   email: 'you@example.com',
```

Used in the Contact section, the footer, and as the fallback if the form ever fails.

### 1.2 Connect the contact form (Formspree)

Right now the form is **deliberately disabled** and shows a "Not connected yet" notice, so
nobody can submit a message into a void.

1. Sign up free at https://formspree.io (~2 minutes, 50 messages/month on the free plan).
2. Create a form. It gives you an endpoint like `https://formspree.io/f/abcdwxyz`.
3. Put the last part into the same file:

```ts
formspreeId: null as string | null,   →   formspreeId: 'abcdwxyz',
```

4. Submit a test message to yourself and confirm it arrives.

### 1.3 Write the Teaching section

**File:** `site/src/app/sections/service/service.content.ts` → `TEACHING_CONTENT`

Four things, a sentence or two each. I deliberately invented none of this:

- **Intro** — your teaching philosophy, what a student can expect.
- **Who I teach** — ages and levels. Beginners? Adults? Audition prep?
- **Where lessons happen** — your studio, do you travel to students, online?
- **Lesson length & rates** — or just "Rates available on request" if you'd rather discuss it.
- **What to bring** — own instrument, books you start with.

### 1.4 Write the Weddings section

**File:** same file → `WEDDINGS_CONTENT`

- **Intro** — what it's like to work with you.
- **Ensembles** — solo, duo, trio, quartet? Which suits which space?
- **Where I perform** — your area, and whether you travel further.
- **Repertoire** — a few sample pieces; do you take requests?
- **Booking & pricing** — how far ahead to book, what's included.

### 1.5 Decide the web address

This changes one build setting, so it's worth deciding before the first deploy:

- **A custom domain** (e.g. `andrealiu.com`) — best for a business; people can remember it.
- **`yourname.github.io`** — free, no purchase.
- **`yourname.github.io/violin-site`** — free, but needs a base-href flag or every image 404s.

Once you choose, tell me and I'll wire it up — or follow `site/DEPLOY.md`, which covers all
three. Two files hardcode `example.com` and must be updated: `site/src/app/core/seo.ts` and
`site/public/robots.txt` / `sitemap.xml`.

> Why it matters: link previews in iMessage and WhatsApp need the real absolute domain, so
> they'll stay broken until this is set.

---

## 2. Important, but the site can launch without them

### 2.1 Send me the top bar screenshot again

The file you gave me was in macOS's temporary screenshot folder
(`TemporaryItems/NSIRD_screencaptureui_…`), which is both permission-protected and wiped when
the screenshot preview closes — I was never able to open it.

For now the bar follows the centered-stacked layout you picked: your name on top, the four
links below, transparent over the photo and solid cream once you scroll past it. If the
screenshot showed something different, re-save it (e.g. to `~/Downloads/topbar.png`) and I'll
match it.

### 2.2 Add your videos

**File:** `site/src/app/sections/videos/videos.content.ts`

For each video, paste the id from its YouTube URL — from
`https://www.youtube.com/watch?v=dQw4w9WgXcQ` the id is `dQw4w9WgXcQ`:

```ts
{ title: 'Bach Partita No. 2', detail: 'Bienen School · 2025', youtubeId: 'dQw4w9WgXcQ' },
```

The card becomes a click-to-play thumbnail automatically. There are three slots; add or delete
lines freely. Nothing loads from YouTube until a visitor presses play.

### 2.3 Phone number and social links

Same `contact.content.ts`. Both optional — leave them `null` / empty and they simply don't
appear:

```ts
phone: '+1 555 123 4567',
socials: [{ label: 'Instagram', url: 'https://instagram.com/yourhandle' }],
```

### 2.4 Your teaching city

**File:** `site/src/app/core/seo.ts`

Once you tell me the city, I'll add a `LocalBusiness` block to the structured data. This is
specifically what makes you show up for searches like *"violin lessons near me"*. I left it out
rather than guess, because a wrong address is worse than none.

---

## 3. Nice to have

- **Photo credit** — if your photographer expects attribution, set `photoCredit` in
  `contact.content.ts` and it appears in the footer.
- **A second photo** — the About section is text-only. A candid or performance shot would break
  it up nicely.
- **Favicon** — currently the default Angular icon. A small monogram would be a nice touch.
- **Version control** — you asked me not to run `git init`, so the project isn't in git yet.
  Worth doing before you start editing, so mistakes are undoable.

---

## What's already done and verified

- One continuous page, six sections, prerendered to real static HTML — the bio is in the page
  source, so search engines see it without running JavaScript.
- Top bar fixed, transparent over the photo, solid after it, and it highlights the section
  you're in. All anchors verified to land clear of the bar.
- Your photo converted from HEIC to three JPEG sizes (231 KB / 535 KB / 890 KB). The browser
  picks by screen size. As PNG this would have been roughly 8 MB.
- Hero framing you approved at both phone and desktop, with your face and the violin intact.
- Contact form: labelled fields, specific error messages, an error summary that takes focus,
  screen-reader announcements, spam honeypot.
- Checked in real Chrome: no horizontal overflow at 375 / 768 / 1440px, zero accessibility
  problems found by the audit, every colour pair measured against WCAG, and Reduce Motion
  leaves all content visible.
- `npm run lint` and `npm run build` both clean.
