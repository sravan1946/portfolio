# p1ng.me

Personal site of Sravan Krishna C M. One static page built with Astro, deployed on Cloudflare Pages.

```bash
npm install
npm run dev      # local dev server
npm run build    # static output in dist/
```

- `src/data.ts`: every word of content (projects, facts, record, stack). Edit here.
- `src/pages/index.astro`: the page and the contact form script.
- `src/site.css`: all styling and motion.
- `functions/api/contact.ts`: Cloudflare Pages function that sends the contact form through Resend. Needs the `RESEND_API_KEY` secret.
- `public/cv.pdf`: the CV behind every "Download CV" button. `public/og.png` is the social preview (a 1200x630 screenshot of the hero).

Design decisions are in `DESIGN.md`, audience and principles in `PRODUCT.md`.
