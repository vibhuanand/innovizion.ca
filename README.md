# Innovizion Inc. website

A lightweight, static company website for https://www.innovizion.ca. The existing GitHub Pages domain is preserved. The production website uses plain HTML, CSS, SVG and a small JavaScript enhancement file, with no third-party scripts, fonts, tracking or runtime packages.

## Work on the site

Use Node.js 22 or later. No installation is needed for the build.

```sh
npm test
npm run preview
```

Open http://localhost:4173. `npm test` regenerates the committed HTML and assets, then validates links, fragments, metadata, schema, CSP hashes, form labels, the sitemap and the existing domain. Edit source files, then commit source **and generated output** together.

## Content and architecture

| Location | Purpose |
| --- | --- |
| `src/config/company.mjs` | Company facts, existing public contact address and approved public credentials/social links |
| `src/config/procurement.mjs` | Public procurement facts and explicit verification/publication gates for awarded statuses |
| `src/config/locales.mjs` | Locale configuration and shared interface messages |
| `src/data/services.mjs` | Six service areas, technical scope, deliverables, assessments and delivery models |
| `src/data/caseStudies.mjs` | Three anonymized personnel-experience summaries and relationship disclosure |
| `src/components/` | Shared layout, metadata, navigation, footer, cards and the original lifecycle visual |
| `src/pages/` | Page content and composition |
| `src/assets/` | Design system, browser enhancements and original brand/social graphics |
| `scripts/` | Build, preview, validation and optional browser/Lighthouse checks |
| `.github/workflows/verify.yml` | Read-only CI checks; does not replace the existing Pages publishing configuration |

The build writes folder-based routes directly to the repository root so the existing branch/root GitHub Pages deployment can publish them. `CNAME` is checked rather than rewritten. `.nojekyll` makes the generated files serve as static content. The original production commit remains available in Git history.

The design uses a charcoal, off-white and muted teal system, shared spacing and typography, responsive grids, keyboard-operable navigation, reduced-motion support and a dedicated print layout.

## Routes

`/`, `/services/`, `/services/cloud-platform/`, `/services/kubernetes/`, `/services/devops/`, `/services/cloud-security/`, `/services/disaster-recovery/`, `/services/sre-observability/`, `/government/`, `/case-studies/`, `/about/`, `/contact/`, `/capabilities/`, `/privacy/`, `/legal/`, `/accessibility/`, and `/404.html`.

The original `generic.html` and `elements.html` URLs have immediate static redirects to `/about/` and `/services/`. GitHub Pages does not provide arbitrary HTTP 301 rules; these use HTML refresh plus a visible fallback link and canonical URL. Existing homepage `#banner`, `#one` and `#cta` anchors are retained.

## Contact behaviour

The current, fully functional contact mode is **email draft**. It validates the enquiry, displays a review screen, creates an encoded `mailto:` link and offers a copy-message alternative. The visitor sends the email from their own email application. It never claims that a message was sent or accepted by a server. The existing public address, `vibhuanand@outlook.com`, is retained. No new domain mailbox is assumed to exist.

There is no form-submission endpoint or server-side inbox exposed to spam. The page does not store enquiries in local storage, send them to analytics or automatically transmit them. Inbound email filtering remains the responsibility of the email provider. Large drafts and devices without a configured email app can use the copy option. No test email was sent during validation.

For direct web submission, an owner-approved form processor or backend is needed. Before enabling one, agree its data handling, retention, processing regions and privacy notice; configure the actual destination; implement server-side field/length validation, rate limiting, spam controls, transport security and appropriate CSRF/origin controls; update CSP and privacy wording; then test real success, rejection and delivery failure. Provider secrets belong on the backend. Adding a frontend URL alone is not a secure submission service.

## Facts and public claims

- Case studies are attributed to **personnel delivery experience**, including work through other organizations and subcontracting arrangements.
- Case studies contain no client logos, internal resource names, IDs, contract details or numerical outcomes.
- No personal clearance is represented as a corporate clearance.
- No ProServices, TBIPS, FSC, DOS, NATO, CPCSC, partnership or corporate-certification badge is published.
- Procurement account registrations and applications are not promoted as awarded qualifications. Public status entries are empty until a status is confirmed and approved for publication.
- Certification and LinkedIn entries are omitted until current evidence and permission to publish are confirmed. Do not store private evidence in this public repository.
- The contact address and all non-sensitive company facts can be changed centrally. Never add business/tax numbers, supplier account IDs, clearance identifiers or private addresses.

## Language readiness

English is the only published language. Shared locale settings, content data and page composition are separated from rendering. To add French, provide reviewed translations of the page modules, services, case studies, metadata and shared navigation/footer messages, add `/fr/` routes through the build, and implement reciprocal language links and `hreflang`. Do not enable a language switch before all linked pages have reviewed content. The current design supports wrapping and flexible grids; test French text lengths at the same mobile widths.

## Security and privacy

The site has no third-party browser dependencies or analytics. Page CSP limits scripts and styles to the site, hashes the exact JSON-LD block, disallows object embedding and form posting, and allows only same-origin connection requests. A meta CSP cannot provide all HTTP response protections, such as `frame-ancestors`; GitHub Pages controls response headers and cache lifetimes. No header capability is claimed that Pages does not provide.

The privacy page describes the actual draft/email flow and external hosting/email processing without promising Canadian-only data residency or legal certification. Review business privacy practices and contact/retention arrangements before changing the workflow.

## Optional browser QA

Install development-only tooling when needed:

```sh
npm install --no-save --package-lock=false playwright@1.58.2 @axe-core/playwright@4.13.0 lighthouse@13.5.0
npx playwright install --with-deps chromium firefox webkit
node scripts/browser-check.mjs
node scripts/lighthouse-check.mjs
```

`CHROME_PATH` can identify an installed Chrome/Chromium executable. `QA_PACKAGE` can point at a separate QA-tool package.json. `QA_BROWSERS=chromium` selects a subset. The scripts start their own preview server. Reports go into ignored `qa/`; no enquiries are sent. Lighthouse is a local laboratory measurement, not a production field-performance guarantee. Automated accessibility checks do not replace testing with assistive technologies or an independent conformance evaluation.

## Publishing and recovery

1. Run `npm test` and the relevant browser checks.
2. Review the content and generated diff. Keep `CNAME` unchanged.
3. Commit the generated site and its source together; publish to the existing `main` branch after validation.
4. Confirm the Pages deployment, HTTPS, key page routes, sitemap and legacy redirects.
5. If recovery is necessary, revert the redesign commit with a new commit; do not force-push or delete the Pages site.

The original HTML5 UP / Spectral template code and stock assets were removed from the new site. Its historical `LICENSE.txt` is retained for provenance. New visual elements, styling, templates and browser code are original to this rebuild.
