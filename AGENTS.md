# Project Handover - Axora Landing Site

## 1. Project Overview & Philosophy

- Static marketing site for Axora, a two-person web development studio (Santi and Franco). One landing page plus a contact page.
- Owner constraint: HTML, CSS, and Bootstrap only, with the minimum possible JavaScript. Reject solutions that add JS when a CSS-only alternative exists (the neon title, promo card, and progress bar animations are intentionally pure CSS).
- Brand palette is fixed at three colors: `#c34e6b` (accent, from the logo), black, white. Lighter/darker variants of the accent are allowed and defined as CSS variables in `style.css` (`--axora-claro`, `--axora-oscuro`).
- All user-facing copy is in Rioplatense Spanish (voseo: "contanos", "completá"). Keep this register when editing copy.

## 2. Architecture & Key Decisions

- `movil.css` must be linked after `style.css` in every HTML file. It overrides desktop rules with equal specificity, so link order is the only thing making the mobile styles win.
- The neon title effect depends on each letter of "AXORA" being wrapped in its own `<span>`, with per-letter `animation-delay` defined via `:nth-child(1..5)` in `style.css`. If the brand text ever changes length, new `nth-child` delay rules must be added or trailing letters will not animate.
- Navbar has two states: `.scrolled` is toggled by `main.js` on scroll (landing page), while `.navbar-solida` is applied statically in `contacto.html` because that page has no hero to be transparent over. Do not remove `.navbar-solida` when editing the contact page.
- Bootstrap's JS bundle is loaded only for the collapsible mobile navbar. Everything else is CSS.

## 3. External APIs & Third-Party Behavior

- Contact form is intended to POST to Web3Forms (`https://api.web3forms.com/submit`), no backend exists. The access key is public by design (it is an email alias, not a secret), safe to commit in HTML.
- The Web3Forms `redirect` hidden field must contain the absolute production URL (`https://axora.pages.dev/...`), not a relative path. A relative value breaks the post-submit redirect.
- The form includes a hidden `botcheck` checkbox as a honeypot. Do not remove it, it is the only spam protection.
- Free Web3Forms tier caps at 250 submissions/month.

## 4. Gotchas & Anti-Patterns

- Windows hides known file extensions by default on this developer's machine. This already caused `logo.png.png` (HTML references `logo.png`, image 404s). When adding any asset, verify the real extension before committing.
- The last known project snapshot is stale relative to agreed changes. Before any deploy, verify: logo renamed to `logo.png`, `index.html` contains the split hero (promo card "7 DÍAS") and the `code-card` team placeholder, Web3Forms wired into `contacto.html`, logo uncommented in `contacto.html`.
- A stale comment inside `contacto.html` shows the logo path as `../assets/logo.png`. The correct path from that page is `../assets/img/logo.png`.
- Files have shown mojibake (`Ã¡`, `ðŸ’œ`) from wrong encoding. All files must be saved as UTF-8; check the VS Code status bar before deploying, the mojibake ships to production otherwise.
- The team photo section in `index.html` is intentionally a commented-out `<img>` plus a code-card placeholder. Instructions for swapping in the real photo (`front/dist/assets/img/equipo.jpg`) are in the HTML comment at that spot.

## 5. Environment & Deployment

- Hosting is Cloudflare Pages via Direct Upload (drag and drop), project name `axora`, served at `axora.pages.dev`. There is no Git integration.
- Direct Upload projects cannot be converted to Git-connected projects later. Migrating to Git-based deploys requires creating a new Pages project.
- Upload the folder whose root directly contains `index.html`. Uploading a wrapping parent folder makes every URL 404 because Pages serves `index.html` from the top level.
- Updates are manual: open the Pages project, "Create a new deployment", drag the folder again. Nothing deploys automatically.
- An earlier deploy was mistakenly created as a Cloudflare Worker at `axora.santiagofiore.workers.dev` (the account subdomain leaks the owner's name). It was supposed to be deleted; if it still exists, delete the Worker, do not reuse it.
- The site works from `file://` locally because all paths are relative. Keep them relative, no leading `/`, so local preview stays deploy-identical.