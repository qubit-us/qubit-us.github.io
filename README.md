# Qubit website

Static GitHub Pages website for Qubit with three pages:

- `/`: services and product portfolio
- `/rydes/`: upcoming community carpooling product
- `/wecarevets/`: upcoming veterans and family support initiative

The existing `CNAME` preserves `qubit-us.com`. GitHub Pages publishes the root of `main`.

## Development

Requires Node.js and npm. Run `npm ci`, then `npm run build` after HTML or theme changes. Run `npm run verify` to check local links, assets, JavaScript syntax and domain settings. `npm run preview` serves the site at `http://127.0.0.1:4318/`.

Compiled CSS in `assets/css/` is committed so GitHub Pages needs no Node build step. The build creates a stylesheet filename containing its content hash and updates each page to reference it, preventing cached CSS from hiding new layouts after deployment. Older stylesheet files are retained for previously cached HTML. Page theme settings live in `config/`. Logos are bundled in `assets/brand/`. Google Fonts, Iconify and stock photography load from their external providers.

The homepage uses the business email and phone from the previous website. Upcoming-product forms are non-submitting previews. Stock photographs and illustrative product interfaces do not represent customer testimonials or actual program participants. Selected photo credits are in `photo-credits.json`.
