import {nomiarch} from '../data/nomiarch.mjs';
import {esc,arrow,tagList} from './ui.mjs';

export function nomiarchFeature({compact=false}={}) {
  if (compact) return `<section class="section compact section-muted" aria-labelledby="nomiarch-heading"><div class="container split"><div><p class="eyebrow">Engineering in development</p><h2 class="small-heading" id="nomiarch-heading">${esc(nomiarch.name)}.<br>${esc(nomiarch.headline)}</h2></div><div><p class="lede">${esc(nomiarch.summary)}</p><p class="small-text">${esc(nomiarch.status)} · Sovereign and air-gapped deployment design.</p><a class="text-link" href="/about/#nomiarch">Explore Nomiarch’s engineering context ${arrow}</a></div></div></section>`;
  return `<section class="section section-muted" id="nomiarch" aria-labelledby="nomiarch-heading"><div class="container split"><div><p class="eyebrow">Engineering in development</p><h2 id="nomiarch-heading">${esc(nomiarch.name)}.<br>${esc(nomiarch.headline)}</h2><p class="eyebrow">${esc(nomiarch.status)}</p>${tagList(nomiarch.themes)}</div><div class="prose"><p class="lede">${esc(nomiarch.summary)}</p><p>${esc(nomiarch.context)}</p><p>${esc(nomiarch.connection)}</p><p class="experience-note">${esc(nomiarch.boundary)}</p><a class="text-link" href="${esc(nomiarch.url)}" rel="external">Explore Nomiarch at nomiarch.com ${arrow}</a></div></div></section>`;
}
