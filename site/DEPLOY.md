# Deploying

The site is a **fully static** build: `ng build` prerenders real HTML, so there is no Node
server to run and it can be hosted anywhere that serves files.

```bash
npm run build
```

Everything you deploy is in **`dist/site/browser/`**. That folder is the website.

To look at the built site locally exactly as it will be served:

```bash
npm run preview      # http://localhost:4321
```

---

## GitHub Pages

The one thing that matters is `--base-href`. If it is wrong, the page loads but the CSS,
JavaScript, and photo all 404 and you get unstyled text.

### A custom domain (e.g. `andrealiu.com`)

Serves from the root, so the default is already correct:

```bash
npm run build
```

Then in the repo, add a file named `CNAME` inside `public/` containing just your domain, and
point your DNS at GitHub:

| Type  | Name  | Value                              |
| ----- | ----- | ---------------------------------- |
| A     | `@`   | `185.199.108.153`                  |
| A     | `@`   | `185.199.109.153`                  |
| A     | `@`   | `185.199.110.153`                  |
| A     | `@`   | `185.199.111.153`                  |
| CNAME | `www` | `<your-github-username>.github.io` |

Then enable **Enforce HTTPS** in the repository's Pages settings.

### `username.github.io` (a user site)

Also serves from the root — use `npm run build` unchanged.

### `username.github.io/repo-name` (a project site)

This one needs the base href set to the repository name:

```bash
npm run build:ghpages     # edit this script first: replace REPLACE-WITH-REPO-NAME
```

You also need an empty `.nojekyll` file in `public/`, otherwise GitHub's Jekyll step strips
files and folders beginning with an underscore.

---

## Netlify or Cloudflare Pages

Drag `dist/site/browser` onto their dashboard, or connect the repo with:

- **Build command:** `npm run build`
- **Publish directory:** `dist/site/browser`

Both serve from the root, so no base-href change is needed.

---

## Before the first real deploy

These are placeholders in the code and will be wrong in production until you change them:

| What                  | Where                                         |
| --------------------- | --------------------------------------------- |
| `https://example.com` | `src/app/core/seo.ts` (`SITE_URL`)            |
| `https://example.com` | `public/robots.txt`, `public/sitemap.xml`     |
| Formspree form id     | `src/app/sections/contact/contact.content.ts` |
| Email address         | `src/app/sections/contact/contact.content.ts` |

`SITE_URL` matters more than it looks: Open Graph requires absolute URLs, so link previews in
iMessage, WhatsApp, and Facebook will stay broken until it is the real domain.
