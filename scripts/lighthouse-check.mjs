import {createRequire} from 'node:module';
import {pathToFileURL,fileURLToPath} from 'node:url';
import {spawn} from 'node:child_process';
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const require=createRequire(process.env.QA_PACKAGE||path.join(root,'package.json'));
const {default:lighthouse}=await import(pathToFileURL(require.resolve('lighthouse')));
const {default:desktopConfig}=await import(pathToFileURL(require.resolve('lighthouse/core/config/desktop-config.js')));
const launcher=await import(pathToFileURL(require.resolve('chrome-launcher')));
await mkdir(path.join(root,'qa'),{recursive:true});
const server=spawn(process.execPath,['scripts/serve.mjs'],{cwd:root,stdio:['ignore','pipe','inherit']});
await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject);});
const chrome=await launcher.launch({chromePath:process.env.CHROME_PATH,chromeFlags:['--headless','--no-sandbox','--disable-dev-shm-usage','--disable-gpu']});
const summaries=[];
try{
 for(const [name,route,desktop] of [['home-mobile','/',false],['home-desktop','/',true],['contact-mobile','/contact/',false],['capabilities-desktop','/capabilities/',true]]){
  const options={port:chrome.port,output:['json','html'],logLevel:'error',onlyCategories:['performance','accessibility','best-practices','seo']};
  const result=await lighthouse('http://127.0.0.1:4173'+route,options,desktop?desktopConfig:undefined);
  await writeFile(path.join(root,`qa/lighthouse-${name}.json`),result.report[0]);
  await writeFile(path.join(root,`qa/lighthouse-${name}.html`),result.report[1]);
  const summary={name,scores:Object.fromEntries(Object.entries(result.lhr.categories).map(([k,v])=>[k,Math.round(v.score*100)])),metrics:{FCP:result.lhr.audits['first-contentful-paint'].displayValue,LCP:result.lhr.audits['largest-contentful-paint'].displayValue,CLS:result.lhr.audits['cumulative-layout-shift'].displayValue,TBT:result.lhr.audits['total-blocking-time'].displayValue},failures:Object.entries(result.lhr.audits).filter(([k,v])=>v.score!==null&&v.score<1&&v.details&&v.scoreDisplayMode!=='informative').map(([k,v])=>({id:k,title:v.title,score:v.score}))};
  summaries.push(summary);console.log(JSON.stringify(summary));
 }
 await writeFile(path.join(root,'qa/lighthouse-summary.json'),JSON.stringify(summaries,null,2));
}finally{await chrome.kill();server.kill();}
