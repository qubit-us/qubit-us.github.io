const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.jpg':'image/jpeg','.png':'image/png','.xml':'application/xml','.txt':'text/plain','.json':'application/json'};
http.createServer((req,res)=>{
 let filename=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
 if(filename!==root&&!filename.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
 if(fs.existsSync(filename)&&fs.statSync(filename).isDirectory())filename=path.join(filename,'index.html');
 if(!fs.existsSync(filename)||!fs.statSync(filename).isFile()){res.writeHead(404);res.end('Not found');return;}
 res.writeHead(200,{'Content-Type':types[path.extname(filename)]||'application/octet-stream','Cache-Control':'no-store'});res.end(fs.readFileSync(filename));
}).listen(4318,'127.0.0.1',()=>console.log('Qubit production preview: http://127.0.0.1:4318/'));
