# Website audit and design decisions

Audit date: 2026-09-29. Baseline: commit `1d7af7944e883b3dde049303e112f5d7d280bbc1`.

## Original website

- Static HTML5 UP Spectral template with one business homepage and two unedited template/demo pages.
- `CNAME` specifies `www.innovizion.ca`; repository metadata confirms GitHub Pages is enabled. `main` was the only branch. No custom GitHub Actions workflow was present.
- The live HTTPS homepage was verified in Chrome and matched the repository content.
- Contact was a direct link to the principal’s Outlook mailbox and personal LinkedIn profile; no form backend existed.
- The homepage had a title but no page description, canonical, OpenGraph, Twitter card, structured data, sitemap or robots.txt.
- The HTML lacked a document language and disabled mobile zoom with `user-scalable=no`.
- Stock imagery, jQuery plugins, template CSS and icon-font packages added complexity without establishing relevant engineering evidence.
- Generic pages contained sample content, dead account/social links and unrelated forms.
- Marketing claims about delivery speed were unsupported; no government capability overview, case-study attribution, privacy page or printable statement was present.

## Implementation choice

Retain the existing static GitHub Pages architecture and custom hostname. Add a small Node build using only built-in modules to generate shared static HTML. This provides components, consistent metadata, centralized facts and reusable content without a framework migration or browser bundle. Generated files are committed so the existing hosting source remains usable.

## Buyer journeys

- Procurement: home → government → capability statement → requirement enquiry.
- Technical leader: home → service detail → relevant experience → scoped assessment.
- Prime contractor: government → delivery models → capability information.

The six main service routes group the ten requested capability themes. IaC is part of DevOps; assurance and identity are within security; AI foundations are secondary within cloud engineering. All themes have concrete technical scope.

## Content controls

Only user-supplied company facts and conservatively phrased personnel experience are published. No client logos, private identifiers, invented metrics, claimed organizational clearance, certification, awards or supply-arrangement status are used. Procurement, personnel credentials and social links remain centrally configurable and gated for publication.

## Hosting constraints

The existing host is static. Contact therefore uses a genuine local email-draft workflow with an explicit review step and direct mailbox fallback. The README documents requirements for a future server-backed submission service. GitHub Pages manages HTTP headers and caching; the code does not promise per-site control of those features.
