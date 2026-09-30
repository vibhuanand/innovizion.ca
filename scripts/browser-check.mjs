// Optional QA dependencies live outside the production bundle.
// QA_PACKAGE can point at a separate test-tools package.json.
import {createRequire} from 'node:module';
import {spawn} from 'node:child_process';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const require=createRequire(process.env.QA_PACKAGE||path.join(root,'package.json'));
const {chromium,firefox,webkit}=require('playwright');
const {default:AxeBuilder}=require('@axe-core/playwright');
const routes=JSON.parse(await readFile(path.join(root,'_routes.json'),'utf8'));
await mkdir(path.join(root,'qa'),{recursive:true});
const server=spawn(process.execPath,['scripts/serve.mjs'],{cwd:root,stdio:['ignore','pipe','inherit']});
await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject);});
const base='http://127.0.0.1:4173';const failures=[];const results={browsers:[],pages:[],checks:[],limitations:[]};
const chromeOptions={headless:true,timeout:20000};
if(process.env.CHROME_PATH){chromeOptions.executablePath=process.env.CHROME_PATH;chromeOptions.args=['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--no-zygote'];}
const only=process.env.QA_BROWSERS?.split(',')||['chromium','firefox','webkit'];
const bounded = (promise, label) => {
 let timer;
 return Promise.race([promise,new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error(`${label} did not complete within 20 seconds`)),20000);})]).finally(()=>clearTimeout(timer));
};
try{
 for(const [name,type] of [['chromium',chromium],['firefox',firefox],['webkit',webkit]]){
  if(!only.includes(name))continue;
  let browser;
  try{browser=await type.launch(name==='chromium'?chromeOptions:{headless:true,timeout:20000});}
  catch(error){results.limitations.push(`${name}: ${error.message.split('\n').slice(0,6).join(' ')}`);console.log('UNAVAILABLE',name);continue;}
  console.log('Testing',name,browser.version());results.browsers.push({name,version:browser.version()});
  const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  let page;
  try{page=await bounded(context.newPage(),`${name} new page`);}
  catch(error){results.limitations.push(error.message);await bounded(browser.close(),`${name} close`).catch(()=>{});continue;}
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  const selected=name==='chromium'?routes:routes.filter(r=>['/','/contact/','/capabilities/','/services/cloud-platform/'].includes(r.path));
  for(const r of selected){
   await page.setViewportSize({width:1440,height:1000});
   await page.goto(base+r.path,{waitUntil:'load'});
   const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
   if(axe.violations.length)failures.push({browser:name,path:r.path,axe:axe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
   results.pages.push({browser:name,path:r.path,axeViolations:axe.violations.length});
   for(const width of [1440,768,390,320]){
    await page.setViewportSize({width,height:900});
    const overflow=await page.evaluate(()=>({client:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
    if(overflow.scroll>overflow.client+1)failures.push({browser:name,path:r.path,width,overflow});
   }
  }
  // Keyboard access and responsive navigation.
  await page.setViewportSize({width:390,height:844});await page.goto(base+'/');
  await page.keyboard.press('Tab');if(await page.locator(':focus').textContent()!=='Skip to main content')failures.push({browser:name,check:'skip link is first focus'});
  await page.keyboard.press('Enter');if(await page.locator(':focus').getAttribute('id')!=='main')failures.push({browser:name,check:'skip link targets main'});
  await page.getByRole('button',{name:'Menu',exact:true}).click();
  if(await page.locator('.menu-toggle').getAttribute('aria-expanded')!=='true')failures.push({browser:name,check:'mobile menu opens'});
  await page.keyboard.press('Escape');
  if(await page.locator('.menu-toggle').getAttribute('aria-expanded')!=='false')failures.push({browser:name,check:'escape closes menu'});
  const mobileAxe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
  if(mobileAxe.violations.length)failures.push({browser:name,check:'mobile axe',violations:mobileAxe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))});
  // Form error summary, input validation, email draft, edit, clipboard fallback.
  await page.goto(base+'/contact/?requirement=Azure%20Platform%20Assessment');
  await page.getByRole('button',{name:'Prepare email'}).click();
  if(!await page.locator('#form-errors').isVisible()||await page.locator(':focus').getAttribute('id')!=='form-errors')failures.push({browser:name,check:'error summary focus'});
  await page.locator('#name').fill('Example Visitor');await page.locator('#organization').fill('Example Organization');await page.locator('#email').fill('visitor@example.com');await page.locator('#description').fill('We need an assessment of our cloud platform and recovery readiness.');await page.locator('#timeframe').selectOption({label:'Within 1–3 months'});
  const requests=[];page.on('request',r=>{if(r.method()==='POST')requests.push(r.url());});
  await page.getByRole('button',{name:'Prepare email'}).click();
  if(!await page.locator('#email-review').isVisible())failures.push({browser:name,check:'valid draft review'});
  const mailto=await page.locator('#open-email').getAttribute('href');
  if(!mailto.includes('mailto:vibhuanand@outlook.com?subject=')||!decodeURIComponent(mailto).includes('Example Visitor'))failures.push({browser:name,check:'correct encoded mailto'});
  if(requests.length)failures.push({browser:name,check:'form unexpectedly transmitted',requests});
  await page.getByRole('button',{name:'Copy email text'}).click();await page.waitForFunction(()=>document.querySelector('#copy-status').textContent.length>0);
  await page.getByRole('button',{name:'Edit details'}).click();if(await page.locator('#name').inputValue()!=='Example Visitor')failures.push({browser:name,check:'edit preserves values'});
  await page.setViewportSize({width:1280,height:1000});await page.screenshot({path:path.join(root,`qa/contact-${name}.png`),fullPage:true});
  // Print has a real browser action and avoids site furniture.
  await page.goto(base+'/capabilities/');await page.evaluate(()=>{window.print=()=>{document.body.dataset.printCalled='true';};});await page.getByRole('button',{name:'Print / Save Capability Statement'}).click();
  if(await page.locator('body').getAttribute('data-print-called')!=='true')failures.push({browser:name,check:'print button'});
  if(name==='chromium'){
   await page.pdf({path:path.join(root,'qa/capabilities.pdf'),format:'A4',printBackground:true,preferCSSPageSize:true});
   await page.goto(base+'/');await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:path.join(root,'qa/home-desktop-viewport.png')});
   await page.setViewportSize({width:390,height:844});await page.screenshot({path:path.join(root,'qa/home-mobile-viewport.png')});
   await page.locator('.site-footer').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(root,'qa/footer-mobile.png')});
  }
  const notFound=await page.goto(base+'/this-page-does-not-exist/');if(notFound.status()!==404)failures.push({browser:name,check:'404 status'});
  for(const [old,target] of [['generic.html','/about/'],['elements.html','/services/']]){await page.goto(base+'/'+old);await page.waitForURL(base+target);}
  // No JavaScript: site navigation and direct contact remain available.
  const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const nj=await nojs.newPage();await nj.goto(base+'/contact/');if(!await nj.getByRole('navigation',{name:'Main navigation'}).isVisible())failures.push({browser:name,check:'no-JS navigation'});if(!await nj.locator('.contact-aside a[href^="mailto:"]').isVisible())failures.push({browser:name,check:'no-JS direct contact'});await nojs.close();
  // Expected network console output from requesting the deliberate 404 is excluded.
  const unexpected=errors.filter(e=>!e.includes('404 (Not Found)'));
  if(unexpected.length)failures.push({browser:name,consoleErrors:unexpected});
  results.checks.push({browser:name,passed:'navigation, skip link, escape, form validation/draft/edit/copy feedback, print, redirects, 404, no-JS'});
  await browser.close();
 }
 results.failures=failures;await writeFile(path.join(root,`qa/browser-results-${only.join('-')}.json`),JSON.stringify(results,null,2));
 console.log(JSON.stringify({browsers:results.browsers,pages:results.pages.length,failures,limitations:results.limitations},null,2));
 if(failures.length)process.exitCode=1;
}finally{server.kill();}
