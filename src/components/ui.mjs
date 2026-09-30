export const esc = (value = '') => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
export const arrow = '<span aria-hidden="true">↗</span>';
export function icon(name, size = 28) {
  const paths = {
    layers: '<path d="m3 8 9-5 9 5-9 5Z M3 12l9 5 9-5 M3 16l9 5 9-5"/>',
    cluster: '<path d="m12 2 9 5v10l-9 5-9-5V7Z M3 7l9 5 9-5 M12 12v10 M7.5 4.5l9 5v5l-9 5"/>',
    flow: '<rect x="2" y="3" width="6" height="6" rx="1"/><rect x="16" y="15" width="6" height="6" rx="1"/><path d="M8 6h8a3 3 0 0 1 3 3v6 M2 18h10 M9 15l3 3-3 3"/>',
    boundary: '<path d="M12 2 21 6v6c0 5-9 10-9 10S3 17 3 12V6Z M8 12l3 3 5-6"/>',
    recovery: '<path d="M20 8a8 8 0 0 0-14-3L3 8 M3 3v5h5 M4 16a8 8 0 0 0 14 3l3-3 M21 21v-5h-5 M9 12h6"/>',
    signal: '<path d="M2 12h5l3-8 4 16 3-8h5 M3 21h18"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    location: '<path d="M19 9c0 6-7 13-7 13S5 15 5 9a7 7 0 1 1 14 0Z"/><circle cx="12" cy="9" r="2"/>'
  };
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.layers}</svg>`;
}
export const wordmark = `<span class="brand-symbol" aria-hidden="true"><svg viewBox="0 0 32 32" width="32" height="32" fill="none"><path d="M3 24V8h6v16M13 24V8h6l10 16M23 8h6v10" stroke="currentColor" stroke-width="3"/></svg></span><span>innovizion<span class="brand-dot">.</span></span>`;
export const tagList = items => `<ul class="tags" aria-label="Technologies">${items.map(s=>`<li>${esc(s)}</li>`).join('')}</ul>`;
export const bullets = items => `<ul class="check-list">${items.map(s=>`<li>${icon('check',18)}<span>${esc(s)}</span></li>`).join('')}</ul>`;
export function serviceCards(services) { return `<div class="service-grid">${services.map(s => `<article class="service-card"><div class="card-top">${icon(s.icon)}<span class="mono">${s.number}</span></div><h3><a href="/services/${s.slug}/">${esc(s.name)} ${arrow}</a></h3><p>${esc(s.summary)}</p></article>`).join('')}</div>`; }
export function caseCards(cases) { return `<div class="case-grid">${cases.map((c,i) => `<article class="case-card"><div class="case-art case-art-${i}" aria-hidden="true"><span class="case-index">0${i+1}</span><div class="art-lines"></div><span class="case-art-label">${['IDENTITY / TRUST','PLATFORM / ASSURANCE','SCALE / RELIABILITY'][i]}</span></div><p class="eyebrow">${esc(c.sector)}</p><h3><a href="/case-studies/#${c.slug}">${esc(c.title)} ${arrow}</a></h3><p>${esc(c.summary)}</p></article>`).join('')}</div>`; }
export function sectionHead(kicker,title,description='',link='') { return `<div class="section-head"><div><p class="eyebrow">${esc(kicker)}</p><h2>${title}</h2></div><div class="section-intro">${description ? `<p>${description}</p>` : ''}${link}</div></div>`; }
export function pageHero({kicker,title,intro,crumb=[],dark=false}) {return `<section class="page-hero${dark?' dark':''}"><div class="container"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a>${crumb.map(c=>`<span aria-hidden="true">/</span>${c.href?`<a href="${c.href}">${esc(c.name)}</a>`:`<span aria-current="page">${esc(c.name)}</span>`}`).join('')}</nav><p class="eyebrow">${esc(kicker)}</p><h1>${title}</h1><p class="lede">${intro}</p></div></section>`;}
export function cta(title='A clear requirement. A practical next step.',description='Tell us what you are building, what needs to improve, or where delivery is stuck.') {return `<section class="cta-band" id="cta"><div class="container cta-inner"><div><p class="eyebrow">Let’s get to work</p><h2>${title}</h2><p>${description}</p></div><a class="button button-light" href="/contact/">Discuss a Requirement ${arrow}</a></div></section>`;}
