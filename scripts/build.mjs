import {mkdir,writeFile,readFile,readdir,copyFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {layout} from '../src/components/layout.mjs';
import {home} from '../src/pages/home.mjs';
import {servicesPage,servicePages} from '../src/pages/services.mjs';
import {government,experience,about,capabilities} from '../src/pages/company.mjs';
import {contact} from '../src/pages/contact.mjs';
import {privacy,legal,accessibility,notFound} from '../src/pages/legal.mjs';
import {company} from '../src/config/company.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const pages=[home,servicesPage,...servicePages,government,experience,about,contact,capabilities,privacy,legal,accessibility,notFound];
const version=createHash('sha256').update(await readFile(path.join(root,'src/assets/site.css'))).update(await readFile(path.join(root,'src/assets/site.js'))).digest('hex').slice(0,10);
const outputs=[];
async function output(relative,content){const dest=path.join(root,relative);await mkdir(path.dirname(dest),{recursive:true});await writeFile(dest,content);outputs.push(relative);}
for(const page of pages){const dest=page.path==='/'?'index.html':page.path.endsWith('.html')?page.path.slice(1):page.path.slice(1)+'index.html';await output(dest,layout(page,version));}
for(const file of await readdir(path.join(root,'src/assets'))){await mkdir(path.join(root,'assets'),{recursive:true});await copyFile(path.join(root,'src/assets',file),path.join(root,'assets',file));outputs.push('assets/'+file);}
await output('sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.filter(p=>!p.noindex).map(p=>`\n  <url><loc>${company.url+p.path}</loc><lastmod>${company.contentUpdated}</lastmod></url>`).join('')}\n</urlset>\n`);
await output('robots.txt',`User-agent: *\nAllow: /\nSitemap: ${company.url}/sitemap.xml\n`);
await output('.nojekyll','');
// Keep the deployed hostname byte-for-byte. Do not change DNS or Pages settings.
if((await readFile(path.join(root,'CNAME'),'utf8')).trim()!==new URL(company.url).hostname)throw new Error('Company URL and existing CNAME disagree.');
// Retire old template URLs without a broken link. GitHub Pages does not support custom 301 rules.
for(const [old,target] of [['generic.html','/about/'],['elements.html','/services/']])await output(old,`<!doctype html><html lang="en-CA"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="refresh" content="0;url=${target}"><meta name="robots" content="noindex, follow"><link rel="canonical" href="${company.url+target}"><title>Page moved | Innovizion Inc.</title></head><body><main><h1>This page has moved.</h1><p><a href="${target}">Continue to Innovizion</a></p></main></body></html>`);
await output('_routes.json',JSON.stringify(pages.map(({path,title,noindex=false})=>({path,title,noindex})),null,2)+'\n');
await writeFile(path.join(root,'_generated.json'),JSON.stringify(outputs.sort(),null,2)+'\n');
console.log(`Built ${pages.length} complete pages and 2 legacy redirects. Assets: ${version}. No runtime dependencies.`);
