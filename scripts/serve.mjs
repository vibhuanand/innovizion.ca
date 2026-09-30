import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.xml':'application/xml','.txt':'text/plain','.json':'application/json'};
const port=Number(process.env.PORT||4173);
http.createServer(async(req,res)=>{
  try{
    const url=new URL(req.url,'http://localhost');
    let relative=decodeURIComponent(url.pathname).replace(/^\/+/, '');
    const absolute=path.resolve(root,relative);
    if(!absolute.startsWith(root+path.sep)&&absolute!==root){res.writeHead(403);res.end();return;}
    let file=absolute;
    try{if((await stat(file)).isDirectory()){if(!url.pathname.endsWith('/')){res.writeHead(301,{Location:url.pathname+'/'+url.search});res.end();return;}file=path.join(file,'index.html');}}catch{file=path.join(root,'404.html');res.statusCode=404;}
    res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');
    res.setHeader('X-Content-Type-Options','nosniff');
    res.end(await readFile(file));
  }catch{res.writeHead(500);res.end('Preview error');}
}).listen(port,'0.0.0.0',()=>console.log(`Preview: http://localhost:${port}`));
