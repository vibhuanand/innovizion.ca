import {readFile,stat,access} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {company} from '../src/config/company.mjs';
import {procurement} from '../src/config/procurement.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const routes=JSON.parse(await readFile(path.join(root,'_routes.json'),'utf8'));
const failures=[];const titles=new Set();const descriptions=new Set();let internalLinks=0;
const fail=(route,message)=>failures.push(`${route}: ${message}`);
const fileFor=route=>path.join(root,route==='/'?'index.html':route.endsWith('.html')?route.slice(1):route.slice(1)+'index.html');
for(const route of routes){
 const html=await readFile(fileFor(route.path),'utf8');
 if((html.match(/<h1\b/g)||[]).length!==1)fail(route.path,'Expected exactly one h1');
 if((html.match(/<main\b/g)||[]).length!==1)fail(route.path,'Expected one main landmark');
 if(!html.includes('<html lang="en-CA">'))fail(route.path,'Missing document language');
 if(/user-scalable=no|maximum-scale=1|Lorem ipsum|TODO|placeholder text|href="#"/i.test(html))fail(route.path,'Unfinished or inaccessible content');
 const title=html.match(/<title>(.*?)<\/title>/s)?.[1];
 const description=html.match(/name="description" content="([^"]+)"/)?.[1];
 if(!title||titles.has(title))fail(route.path,'Missing or duplicate title');titles.add(title);
 if(!description||descriptions.has(description))fail(route.path,'Missing or duplicate description');descriptions.add(description);
 if(!html.includes(`rel="canonical" href="${company.url+route.path}"`))fail(route.path,'Incorrect canonical');
 const json=html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1];
 try{const parsed=JSON.parse(json);if(parsed['@context']!=='https://schema.org'||!parsed['@graph'].some(n=>n['@type']==='Organization'))throw Error('graph');}catch{fail(route.path,'Invalid structured data');}
 if(json&&!html.includes(createHash('sha256').update(json).digest('base64')))fail(route.path,'JSON-LD CSP hash mismatch');
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 if(new Set(ids).size!==ids.length)fail(route.path,'Duplicate IDs');
 for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)){
   const href=m[1].replaceAll('&amp;','&');
   if(/^(mailto:|https?:|data:)/.test(href))continue;
   const url=new URL(href,company.url+route.path);let relative=url.pathname;
   let target=path.join(root,relative);
   try{if((await stat(target)).isDirectory())target=path.join(target,'index.html');await access(target);internalLinks++;}
   catch{fail(route.path,`Broken local link ${href}`);continue;}
   if(url.hash&&target.endsWith('.html')){const content=await readFile(target,'utf8');if(!content.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`))fail(route.path,`Missing fragment ${href}`);}
 }
 for(const m of html.matchAll(/<(?:input|select|textarea)\b[^>]*\bid="([^"]+)"[^>]*>/g))if(!html.includes(`for="${m[1]}"`))fail(route.path,`Unlabelled field ${m[1]}`);
 for(const m of html.matchAll(/<(?:input|select|textarea)\b[^>]*aria-describedby="([^"]+)"/g))for(const id of m[1].split(' '))if(!ids.includes(id))fail(route.path,`Missing description ${id}`);
 if(route.path.startsWith('/services/')&&route.path!=='/services/'&&!json.includes('"@type":"Service"'))fail(route.path,'Missing Service schema');
}
const sitemap=await readFile(path.join(root,'sitemap.xml'),'utf8');
for(const route of routes.filter(r=>!r.noindex))if(!sitemap.includes(`<loc>${company.url+route.path}</loc>`))fail(route.path,'Not in sitemap');
if(sitemap.includes('404.html'))fail('sitemap','404 must not be indexed');
if((await readFile(path.join(root,'CNAME'),'utf8')).trim()!=='www.innovizion.ca')fail('CNAME','Domain changed');
if(company.contactMode!=='email-draft')fail('contact','Unsupported contact mode');
for(const s of procurement.statuses)if(s.publish&&(!s.verified||!s.verifiedOn))fail('procurement','Published status requires verification and date');
if(failures.length){console.error(failures.join('\n'));process.exit(1);}
console.log(`PASS: ${routes.length} pages; ${internalLinks} local references; unique metadata, schema, CSP hashes, labels, fragments, sitemap and domain.`);
