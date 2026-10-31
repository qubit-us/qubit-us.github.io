# Qubit website

Static GitHub Pages website for Qubit with four product and portfolio pages:

- `/`: services and product portfolio
- `/rydes/`: upcoming community carpooling product
- `/wecarevets/`: upcoming veterans and family support initiative
- `/formfidence/`: upcoming private form preparation and review product
- `/formfidence/demo/`: fictional interactive concept screens

The existing `CNAME` preserves `qubit-us.com`. GitHub Pages publishes the root of `main`.

## Development

Requires Node.js and npm. Run `npm ci`, then `npm run build` after HTML or theme changes. Run `npm run verify` to check local links, assets, JavaScript syntax and domain settings. `npm run preview` serves the site at `http://127.0.0.1:4318/`.

Compiled CSS in `assets/css/` is committed so GitHub Pages needs no Node build step. The build creates a stylesheet filename containing its content hash and updates each page to reference it, preventing cached CSS from hiding new layouts after deployment. Older stylesheet files are retained for previously cached HTML. Page theme settings live in `config/`. Logos are bundled in `assets/brand/`. Google Fonts, Iconify and stock photography load from their external providers.

The homepage uses the business email and phone from the previous website. Upcoming-product forms are non-submitting previews. Stock photographs and illustrative product interfaces do not represent customer testimonials or actual program participants. Selected photo credits are in `photo-credits.json`.

## Formfidence

The Formfidence page uses its own navy and teal identity, approved raster logo, self-hosted Manrope and Inter variable fonts with OFL licenses, and locally bundled concept screenshots. `scripts/build-formfidence.cjs` gives its CSS and JavaScript content-hashed filenames; `scripts/verify-formfidence.cjs` checks routes, local resources, script syntax and material in-development disclosures as part of `npm run verify`.

The product page describes intended architecture, not a released application or audited privacy guarantee. The research-mode controls are explanatory and send no requests. Contact links open the visitor's email app; they do not claim a message was sent. The demo screens use fictional records and do not save, upload, or submit applications. WCAG 2.2 AA is the design target; automated checks are not a full conformance or legal certification.
